import DB_CONFIG from '../../config/db.config';
import mongoose from 'mongoose';
import logger from '../../utils/logger.util';
import axios from 'axios';
import jsdom from 'jsdom';
import { expose } from 'threads/worker';
import SyllabusModel from '../../models/syllabus/syllabus.model';
import { ObjectId } from 'mongodb';
import * as mongodb from 'mongodb';
import * as fs from 'fs';

const COOKIES = 'INSERT COOKIES HERE';

const LETTERS_TO_SCRAPE = 'W';

const HTTP = axios.create({
    headers: {
        'User-Agent':
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        Cookie: COOKIES
    }
});

const fileDownloadLink = (href: string) => `https://student.utm.utoronto.ca/CourseInfo/${href}`;

async function scrapeUTMSyllabi(): Promise<void> {
    mongoose.set('strictQuery', false); // gets rid of a warning

    mongoose
        .connect('mongodb://localhost:27017/ExamJam', DB_CONFIG.options)
        .then(async () => {
            logger.info(`Connected to database @ ${DB_CONFIG.url}`);

            if ((await SyllabusModel.find({}).countDocuments()) > 0) {
                SyllabusModel.deleteMany({});
            }

            const data = await fetchSyllabusRepo();
            await scrapeTable(data);

            await mongoose.disconnect();
            logger.info('Done');
        })
        .catch((e) => {
            logger.error(`Could not connect to database: `, e);
        });
}

async function scrapeTable(data: any) {
    const repoPage = new jsdom.JSDOM(data.data);
    const tableRows = repoPage.window.document.body.querySelectorAll('tr');

    const client = await mongodb.MongoClient.connect(
        `mongodb://localhost:27017?directConnection=true`
    );
    const db = client.db(DB_CONFIG.name);

    const bucket = new mongodb.GridFSBucket(db);

    const syllabiJson = [];

    for (const row of tableRows) {
        const cells = row.querySelectorAll('td');
        if (cells.length !== 6) {
            logger.warn('Row does not have 6 cells for an unknown reason');
            continue;
        }

        const session = cells[0].textContent;
        const courseCode = cells[1].textContent?.slice(0, 6);
        const meetingSection = cells[3].textContent;
        const instructor = cells[4].textContent;
        const fileDownloadHref = cells[5].querySelector('a')?.getAttribute('href');
        // @ts-ignore
        const originalUrl = fileDownloadLink(fileDownloadHref);

        // @ts-ignore
        if (!LETTERS_TO_SCRAPE.includes(courseCode.charAt(0))) continue;

        logger.info(`[${courseCode}] (${session}) (${meetingSection}) (${instructor}) Downloading`);
        const fileId = await downloadFile(originalUrl, bucket);
        await SyllabusModel.create({
            session,
            courseCode,
            meetingSection,
            instructor,
            originalUrl,
            fileId
        });
        logger.info('Inserting syllabus object');
    }
}

async function fetchSyllabusRepo() {
    logger.info('Fetching the course outline page');

    try {
        return await HTTP.post('https://student.utm.utoronto.ca/CourseInfo/', {
            session_cd: '',
            department_id: '',
            search: 1
        });
    } catch (e: any) {
        logger.error('Could not fetch repo page. Your cookies may be expired');
        return null;
    }
}

async function downloadFile(url: string, bucket: mongodb.GridFSBucket): Promise<ObjectId> {
    const syllabusBinary = await HTTP.get(url, { responseType: 'stream' });

    const uploadStream = bucket.openUploadStream(url);
    syllabusBinary.data
        .pipe(uploadStream)
        .on('error', () => logger.error(`Failed to download file for ${url}`))
        .on('finish', () => logger.info('Finished downloading'));

    const timeToSleepInMs = Math.floor(Math.random() * 5 + 2) * 1000;
    logger.info(`Sleeping for ${timeToSleepInMs / 1000} seconds`);
    // Sleeping for a random time between 2 - 5 seconds
    await sleep(timeToSleepInMs);

    return uploadStream.id;
}

/**
 * A function that blocks execution for ms number of ms
 * This is required to prevent piazza from rate limiting this script.
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default scrapeUTMSyllabi;
