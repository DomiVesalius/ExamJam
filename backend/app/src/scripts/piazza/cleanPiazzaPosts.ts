import mongoose from 'mongoose';
import DB_CONFIG from '../../config/db.config';
import logger from '../../utils/logger.util';
import { RawPiazzaPostService } from '../../models/piazzaPosts/raw/rawPiazzaPost.service';
import { IRawPiazzaPostModel } from '../../models/piazzaPosts/raw/rawPiazzaPost.model';
import PiazzaPostModel, {
    IPiazzaPostModel
} from '../../models/piazzaPosts/cleaned/piazzaPost.model';
import {
    CleanPiazzaService,
    CreateCommentFields
} from '../../models/piazzaPosts/cleaned/cleanPiazza.service';
import PiazzaCommentModel, {
    CommentType
} from '../../models/piazzaPosts/cleaned/piazzaComment.model';

interface PostHistory {
    anon: string;
    uid_a: string;
    subject: string;
    created: string;
    content: string;
}

interface Child {
    history_size: number;
    folder: Array<any>;
    data: object;
    created: string;
    type: CommentType;
    id: string;
    is_tag_endorse: boolean;
    children: Child[];
}

interface AnswerChild extends Child {
    history: PostHistory[];
}

interface FollowupChild extends Child {
    subject: string;
}

/**
 * Goes through all RawPiazzaPost documents in the database and creates cleaner/filtered versions of them to save
 * into the database.
 */
async function cleanAllPiazzaPosts() {
    mongoose.set('strictQuery', false); // gets rid of a warning

    mongoose
        .connect('mongodb://localhost:27017/ExamJam', DB_CONFIG.options)
        .then(async () => {
            logger.info(`Connected to database @ mongodb://localhost:27017/ExamJam`);
            try {
                await PiazzaCommentModel.deleteMany({});
                await PiazzaPostModel.deleteMany({});
                logger.info('Deleted all existing piazza posts');
            } catch (e) {
                logger.error('Failed to delete all existing piazza posts');
            }

            const rawPosts = await RawPiazzaPostService.getAll();

            for (const rawPostDoc of rawPosts) {
                await cleanPiazzaPost(rawPostDoc);
            }

            await mongoose.disconnect();
        })
        .catch((e) => {
            logger.error(`Could not connect to database: `, e);
        });
}

/**
 * This post will take in a RawPiazzaPost document from the database and filter the relevant properties into
 * a PiazzaPost document. It will also create PiazzaComments corresponding to the post and will save it all in the db.
 * @param rawPostDoc
 */
async function cleanPiazzaPost(rawPostDoc: IRawPiazzaPostModel) {
    const { courseCode, forumId, postNumber, _id, data } = rawPostDoc;

    const { result }: any = data;

    const createdAt = result.created;

    const postHistory = result.history as Array<PostHistory>;

    if (postHistory.length < 1) {
        logger.info(`[${_id}]: has no history. Moving on`);
        return;
    }

    // Sorting history by date in descending order
    sortHistoryByDateCreated(postHistory);
    const latestEdit = postHistory[0];

    const { content } = latestEdit;
    const title = latestEdit.subject;

    // if (_id === "class/kip3vewml4m2po/post/970")

    const cleanedPost = await CleanPiazzaService.createPiazzaPost({
        title,
        createdAt,
        content,
        courseCode,
        postNumber,
        _id,
        forumId
    });

    if (!cleanedPost) {
        logger.error(`[${_id}]: Failed to create clean post`);
        return;
    }

    const children = result.children as Array<Child>;

    const childrenToBeAddedToDb = await createChildren(cleanedPost, null, children);

    for (const commentToCreate of childrenToBeAddedToDb) {
        const commentDoc = await CleanPiazzaService.createComment(commentToCreate);

        if (commentDoc) {
            logger.info(`Created ${commentToCreate.type} comment for ${commentToCreate.postId}`);
        } else {
            logger.error(
                `Failed to create ${commentToCreate.type} comment for ${commentToCreate.postId}`
            );
        }
    }
}

/**
 * This is a recursive function but in reality, piazza comments can only nest up to a depth of 2.
 * This function will create objects of type CreateCommentFields according to the parameters and output them
 * as a list. Essentially, this creates a list of comments objects that can be nested but does not save them in the db.
 * @param post
 * @param parent
 * @param children
 */
async function createChildren(
    post: IPiazzaPostModel,
    parent: CreateCommentFields | null,
    children: Array<Child>
): Promise<Array<CreateCommentFields>> {
    const results: Array<CreateCommentFields> = [];

    if (children.length == 0) {
        return results;
    }

    for (const child of children) {
        // Create the child comment

        let type: CommentType;
        if (child.type === CommentType.studentAnswer) {
            type = CommentType.studentAnswer;
        } else if (child.type === CommentType.instructorAnswer) {
            type = CommentType.instructorAnswer;
        } else if (child.type === CommentType.followUp) {
            type = CommentType.followUp;
        } else if (child.type === CommentType.feedback) {
            type = CommentType.feedback;
        } else {
            logger.info(`Found comment child with unknown type: ${child.type}`);
            continue;
        }

        let content: string;
        if (type !== CommentType.followUp && type !== CommentType.feedback) {
            const castedChild = child as AnswerChild;
            const commentHistory = castedChild.history;
            const latestEdit = commentHistory[0];
            content = latestEdit.content;
        } else {
            const castedChild = child as FollowupChild;
            content = castedChild.subject;
        }

        let parentId = parent ? parent._id : null;

        const comment: CreateCommentFields = {
            _id: child.id,
            postId: post._id,
            type,
            parentId,
            content
        };

        results.push(comment);

        const child_children = child.children;
        // Create children of the current child comment (recursion)
        if (type === CommentType.followUp || type == CommentType.feedback) {
            const rec_res = await createChildren(post, comment, child_children);
            results.push(...rec_res);
        }
    }

    return results;
}

/**
 * PostHistory objects have a `created` field that represents at which time they were created.
 * This function uses that field to sort the history so that the first entry is the most recent edit.
 * @param history
 */
function sortHistoryByDateCreated(history: Array<PostHistory>) {
    history.sort((a: PostHistory, b: PostHistory) => {
        const aCreatedAt = new Date(a.created).valueOf();
        const bCreatedAt = new Date(b.created).valueOf();
        return bCreatedAt - aCreatedAt;
    });
}

cleanAllPiazzaPosts();
