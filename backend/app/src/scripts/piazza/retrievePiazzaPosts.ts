import { performance } from 'perf_hooks';
import logger from '../../utils/logger.util';
import fetch, { Response } from 'node-fetch';
import { RawPiazzaPostService } from '../../models/piazzaPosts/raw/rawPiazzaPost.service';
import DB_CONFIG from '../../config/db.config';
import mongoose from 'mongoose';

/**
 * Cookies and CSRF Tokens are required for the scraping scripts to work because all the
 * information requires you to be authenticated.
 * A single user does not have access to every piazza forum so these cookies
 * are identified by the name of the user.
 */
const COOKIES_AND_CSRF = {
    domi: {
        csrfToken: 'REPLACE THIS WITH YOUR OWN CSRF TOKEN',
        cookies: 'REPLACE THIS WITH YOUR OWN COOKIES'
    }
};

/**
 * A mapping of a user to the piazza forums they have access to as well as the cookies
 * that can be used to access it.
 */
const USER_TO_FORUMS_MAP = {
    domi: {
        cookies: COOKIES_AND_CSRF.domi.cookies,
        csrfToken: COOKIES_AND_CSRF.domi.csrfToken,
        forums: [
            {
                forumId: 'jw2uhydb1dljb',
                courseCode: 'CSC108'
            },
            {
                forumId: 'ke1k9nqkmfl7nf',
                courseCode: 'CSC148'
            },
            {
                forumId: 'kjbjwnmx23xp5',
                courseCode: 'CSC207'
            },
            {
                forumId: 'kx4tqn7195h5vd',
                courseCode: 'CSC209'
            },
            {
                forumId: 'krdk1qryyzf5vd',
                courseCode: 'CSC236'
            },
            {
                forumId: 'kip3vewml4m2po',
                courseCode: 'CSC258'
            }
        ]
    }
};

interface ForumInfo {
    forumId: string;
    courseCode: string;
}

/**
 * Traverses through all the forums within the USERS_TO_FORUMS_MAP object
 * and:
 *      1) Requests the feed of that forum
 *      2) Extracts all the post numbers from the feed response
 *      3) Uses the post numbers to request data about each post
 *      4) Saves the post data into the database
 */
async function scrapeAllForums(): Promise<void> {
    mongoose.set('strictQuery', false); // gets rid of a warning

    mongoose
        .connect('mongodb://localhost:27017/ExamJam', DB_CONFIG.options)
        .then(async () => {
            logger.info(`Connected to database @ ${DB_CONFIG.url}`);

            for (const value of Object.values(USER_TO_FORUMS_MAP)) {
                const { cookies, forums, csrfToken } = value;

                for (const forum of forums) {
                    logger.info(`[STARTED] ${forum.courseCode}`);
                    const startTime = performance.now();

                    await scrapeForum(forum, cookies, csrfToken);

                    const endTime = performance.now();
                    logger.info(
                        `[ENDED] ${forum.courseCode}. [TIME ELAPSED: ${endTime - startTime} ms]`
                    );
                }
            }
            await mongoose.disconnect();
        })
        .catch((e) => {
            logger.error(`Could not connect to database: `, e);
        });
}

/**
 * - Requests the feed of the given piazza forum
 * - Extracts all numbers/ids of the visible posts in the feed
 * - Loops through each post number and requests data related to that post
 * - Saves that data into the RawPiazzaPost collection
 * @param forumInfo An object containing the forum id and the name of the course it is for
 * @param cookies cookies that can be used to access the forum
 * @param csrfToken also required to access the forum
 */
async function scrapeForum(
    forumInfo: ForumInfo,
    cookies: string,
    csrfToken: string
): Promise<void> {
    const { courseCode, forumId } = forumInfo;

    logger.info(`[${courseCode}/${forumId}]: Requesting Feed`);
    const feedResponse = await getFeed(forumId, cookies, csrfToken);
    const feedData = await feedResponse.json();

    logger.info(`[${courseCode}/${forumId}]: Extracting Post Numbers`);
    const postNumbers = await extractPostNumbers(forumId, feedData);

    let i = 1;
    for (const num of postNumbers) {
        logger.info(`[${courseCode}/${forumId}]: Requesting Post #${num}`);
        const postResponse = await getPost(forumId, num, cookies, csrfToken);
        const postData = await postResponse.json();

        const rawPost = await RawPiazzaPostService.create(postData, courseCode, num, forumId);

        if (rawPost) {
            logger.info(
                `[${courseCode}/${forumId}]: (${i}/${postNumbers.length}) Saved Post #${num} into DB`
            );
        } else {
            logger.error(`Failed to save post [${courseCode}/${forumId}/${num}]`);
        }

        const timeToSleepInMs = Math.floor(Math.random() * 5 + 2) * 1000;
        logger.info(`Sleeping for ${timeToSleepInMs / 1000} seconds`);
        // Sleeping for a random time between 2 - 5 seconds
        await sleep(timeToSleepInMs);

        i += 1;
    }
}

/**
 * Sends an HTTP request to retrieve the feed for a specific forum
 * @param forumId the id of the forum
 * @param cookies allow access to the forum
 * @param csrfToken also allows access to the forum
 */
async function getFeed(forumId: string, cookies: string, csrfToken: string): Promise<Response> {
    return await fetch('https://piazza.com/logic/api?method=network.get_my_feed', {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0',
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            Cookie: cookies,
            Referrer: `https://piazza.com/class/${forumId}`
        },
        body: JSON.stringify({
            method: 'network.get_my_feed',
            params: { nid: forumId, offset: 0, limit: 99999 }
        }),
        method: 'POST'
    });
}

/**
 * Takes in the response from getting the feed for a specific forum and extracts all
 * visible post numbers that do not already exist in the database for that specific forum id
 * @param forumId the forum id
 * @param feedData http response for getting feed
 */
async function extractPostNumbers(forumId: string, feedData: any): Promise<Array<number>> {
    const nums: Array<number> = [];

    // result contains a key called 'feed'
    const { result } = feedData;

    // feed is an array of posts
    const { feed } = result;

    for (const postData of feed) {
        const { type } = postData;
        // Ignoring non-question posts
        if (type === 'question') {
            // Only save this number if the corresponding post does not exist in the db.
            if (!(await RawPiazzaPostService.get(forumId, postData.nr))) nums.push(postData.nr); // nr is a number that represents the posts number
        }
    }

    // JS is weird and sorts alphabetically so the compareFn is there to make sure
    // that it isi sorted numerically:
    // Source: https://medium.com/coding-at-dawn/how-to-sort-an-array-numerically-in-javascript-2b22710e3958
    nums.sort((a: number, b: number) => a - b);

    return nums;
}

/**
 * Sends an HTTP request to get data related to the post with the given postNumber
 * within the forum with the given forumId
 * @param forumId the forum to which the post belongs
 * @param postNumber the number identifier of the post within the forum
 * @param cookies allow access to the information
 * @param csrfToken also allows access to the forum information
 */
async function getPost(
    forumId: string,
    postNumber: number,
    cookies: string,
    csrfToken: string
): Promise<Response> {
    return await fetch('https://piazza.com/logic/api?method=content.get', {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0',
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            Cookie: cookies,
            Referrer: `https://piazza.com/class/${forumId}`
        },
        body: JSON.stringify({
            method: 'content.get',
            params: { cid: postNumber, nid: forumId, student_view: null }
        }),
        method: 'POST'
    });
}

/**
 * A function that blocks execution for ms number of ms
 * This is required to prevent piazza from rate limiting this script.
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

scrapeAllForums();
