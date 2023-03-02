import PiazzaPostModel, { IPiazzaPost, IPiazzaPostModel } from './piazzaPost.model';
import PiazzaCommentModel, { CommentType, IPiazzaCommentModel } from './piazzaComment.model';
import { Schema } from 'mongoose';

export interface PostObject extends IPiazzaPost {
    _id: string;
    comments: CommentObject[];
}

export interface CommentObject {
    _id: string;
    postId: string;
    parentId: string | null;
    type: string;
    content: string;
    children: ChildCommentObject[];
}

interface ChildCommentObject {
    _id: string;
    postId: string;
    parentId: string | null;
    type: string;
    content: string;
    children: any[];
}

interface CreatePiazzaPostFields {
    _id: string;
    courseCode: string;
    forumId: string;
    postNumber: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface CreateCommentFields {
    _id: string;
    postId: Schema.Types.String;
    type: CommentType;
    parentId: Schema.Types.String | string | null;
    content: string;
    children?: string[];
}

export class CleanPiazzaService {
    public static async createPiazzaPost(
        fields: CreatePiazzaPostFields
    ): Promise<IPiazzaPostModel | null> {
        try {
            return await PiazzaPostModel.create({
                ...fields,
                createdAt: new Date(fields.createdAt),
                comments: []
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public static async createComment(
        fields: CreateCommentFields
    ): Promise<IPiazzaCommentModel | null> {
        try {
            if (!fields.children) fields.children = [];
            return await PiazzaCommentModel.create({ ...fields });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public static async getPostsOfCourse(
        courseCode: string,
        page: number,
        limit: number
    ): Promise<PostObject[]> {
        try {
            const coursePosts = await PiazzaPostModel.find({ courseCode })
                .sort({ postNumber: 1 })
                .skip(page * limit - 1)
                .limit(limit);
            const posts: PostObject[] = [];

            for (const post of coursePosts) {
                const postObj = this.getPostObject(post);
                const commentsUnderPost = await this.getCommentsOfPost(postObj._id);
                postObj.comments.push(...commentsUnderPost);
                posts.push(postObj);
            }

            return posts;
        } catch (e) {
            return [];
        }
    }

    public static async getCommentsOfPost(postId: string): Promise<CommentObject[]> {
        try {
            // Getting the non-children comments first
            const topLevelComments = await PiazzaCommentModel.find({ postId, parentId: null });

            const comments = [];

            for (const comment of topLevelComments) {
                // Creating a matching comment object
                const commentObj = this.getCommentObj(comment) as CommentObject;

                // Only non-answer comments have children and only up to a depth of 2
                // i.e. a child cannot have a child
                for (const childId of comment.children) {
                    const childComment = await PiazzaCommentModel.findById(childId);

                    if (!childComment) continue;

                    const childCommentObj = this.getCommentObj(childComment) as ChildCommentObject;
                    commentObj.children.push(childCommentObj);
                }
                comments.push(commentObj);
            }
            return comments;
        } catch (e) {
            return [];
        }
    }

    public static async getPost(forumId: string, postNumber: number): Promise<PostObject | null> {
        try {
            const postId = `class/${forumId}/post/${postNumber}`;
            const piazzaPost = await PiazzaPostModel.findById(postId);

            if (!piazzaPost) return null;

            const postObj = this.getPostObject(piazzaPost);
            const commentsOfPost = await this.getCommentsOfPost(postObj._id);
            postObj.comments.push(...commentsOfPost);

            return postObj;
        } catch (e) {
            return null;
        }
    }

    private static getPostObject(post: IPiazzaPostModel): PostObject {
        return {
            _id: post._id,
            forumId: post.forumId,
            courseCode: post.courseCode,
            postNumber: post.postNumber,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            comments: []
        };
    }

    private static getCommentObj(comment: IPiazzaCommentModel): CommentObject | ChildCommentObject {
        return {
            _id: comment._id,
            postId: comment.postId,
            parentId: comment.parentId,
            type: comment.type,
            content: comment.content,
            children: []
        };
    }
}
