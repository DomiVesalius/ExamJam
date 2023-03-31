import PiazzaPostModel, {
    IPiazzaPostModel
} from '../../models/piazzaPosts/cleaned/piazzaPost.model';
import mongoose from 'mongoose';
import DB_CONFIG from '../../config/db.config';
import logger from '../../utils/logger.util';
import jsdom from 'jsdom';
import PiazzaCommentModel, {
    IPiazzaComment,
    IPiazzaCommentModel
} from '../../models/piazzaPosts/cleaned/piazzaComment.model';

const URL_PREFIX = 'https://piazza.com';

async function main() {
    mongoose.set('strictQuery', false); // gets rid of a warning

    mongoose.connect('mongodb://localhost:27017/ExamJam', DB_CONFIG.options).then(async () => {
        logger.info(`Connected to database @ mongodb://localhost:27017/ExamJam`);

        logger.info('Modifying post images');
        await modifyImageLinksOfPosts();
        logger.info('Done modifying posts');

        logger.info('Modifying comment images');
        await modifyImageLinksOfComments();
        logger.info('Done modifying comments');

        logger.info('Done-----------------------------');

        await mongoose.disconnect();
    });

    return;
}

async function modifyImageLinksOfPosts() {
    const piazzaPosts: IPiazzaPostModel[] = await PiazzaPostModel.find({
        content: { $regex: 'img', $options: 'i' }
    });

    if (!piazzaPosts) return;

    for (const post of piazzaPosts) {
        const dom = new jsdom.JSDOM(post.content, { contentType: 'text/html' });
        const { document } = dom.window;
        const images = document.querySelectorAll('img');
        if (!images) continue;

        logger.info(`[${post.courseCode}] Found images in post '${post.id}'`);

        for (const img of images) {
            const src = img.getAttribute('src');

            if (!src) {
                logger.info(`No src found for image '${img.id}'...Continuing`);
                continue;
            }

            if (!src.startsWith(URL_PREFIX)) {
                img.setAttribute('src', `${URL_PREFIX}${src}`);
            }
        }

        post.content = document.body.innerHTML;
        await post.save();

        logger.info(`[${post.courseCode}] Updated post '${post.id}'`);
    }
}

async function modifyImageLinksOfComments() {
    const piazzaComments: IPiazzaCommentModel[] = await PiazzaCommentModel.find({
        content: { $regex: 'img', $options: 'i' }
    });

    if (!piazzaComments) return;

    for (const comment of piazzaComments) {
        const dom = new jsdom.JSDOM(comment.content, { contentType: 'text/html' });
        const { document } = dom.window;
        const images = document.querySelectorAll('img');
        if (!images) continue;

        logger.info(`[${comment.postId}] Found images in comment '${comment.id}'`);

        for (const img of images) {
            const src = img.getAttribute('src');

            if (!src) {
                logger.info(`No src found for image '${img.id}'...Continuing`);
                continue;
            }

            if (!src.startsWith(URL_PREFIX)) {
                img.setAttribute('src', `${URL_PREFIX}${src}`);
            }
        }

        comment.content = document.body.innerHTML;
        await comment.save();

        logger.info(`[${comment.postId}] Updated comment '${comment.id}'`);
    }
}

main();
