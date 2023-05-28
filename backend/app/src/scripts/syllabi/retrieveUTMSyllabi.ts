import DB_CONFIG from '../../config/db.config';
import mongoose from 'mongoose';
import logger from '../../utils/logger.util';
import axios from 'axios';
import jsdom from 'jsdom';
import { expose } from 'threads/worker';
import SyllabusModel from '../../models/syllabus/syllabus.model';

const COOKIES = 'INSERT COOKIES HERE';

const DOWNLOAD_FILES = false;

const fileDownloadLink = (href: string) => `https://student.utm.utoronto.ca/CourseInfo/${href}`;

async function scrapeUTMSyllabi(): Promise<void> {
    mongoose.set('strictQuery', false); // gets rid of a warning

    mongoose
        .connect('mongodb://localhost:27017/ExamJam', DB_CONFIG.options)
        .then(async () => {
            logger.info(`Connected to database @ ${DB_CONFIG.url}`);

            const data = await fetchSyllabusRepo();
            await scrapeTable(data);

            if (DOWNLOAD_FILES) await downloadFiles();

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

        syllabiJson.push({
            session,
            courseCode,
            meetingSection,
            instructor,
            originalUrl
        });
    }

    logger.info('Inserting syllabi objects');
    await SyllabusModel.insertMany(syllabiJson);
}

async function fetchSyllabusRepo() {
    const http = axios.create({
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

    logger.info('Fetching the course outline page');

    try {
        return await http.post('https://student.utm.utoronto.ca/CourseInfo/', {
            session_cd: '',
            department_id: '',
            search: 1
        });
    } catch (e: any) {
        logger.error('Could not fetch repo page. Your cookies may be expired');
        return null;
    }
}

/**
 * DANGEROUS!!
 * There are over 10k syllabi in the UTM repo alone. Downloading all of them will take a lot of data so do
 * this at your own risk. Use the DOWNLOAD_FILES option for safety.
 */
async function downloadFiles() {}

export default scrapeUTMSyllabi;
