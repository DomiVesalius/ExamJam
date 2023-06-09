import { IUserModel } from '../user/user.model';
import PostModel, { IPostModel } from './post.model';
import { IPiazzaPost } from '../piazzaPosts/cleaned/piazzaPost.model';
import { CommentObject } from '../piazzaPosts/cleaned/cleanPiazza.service';
import { setInteractionFields } from '../models.helpers';

export interface PostObject extends IPiazzaPost {
    _id: string;
    comments: CommentObject[];
}

export class PostsService {
    public static async createPost(
        user: IUserModel,
        title: string,
        content: string,
        formatType: string,
        examId: string,
        courseCode: string
    ): Promise<IPostModel | null> {
        try {
            return await PostModel.create({
                author: user.email,
                title,
                content,
                formatType,
                examId,
                courseCode
            });
        } catch (e) {
            return null;
        }
    }

    public static async getTotalNumPosts(
        examIds: string[],
        limit: number,
        keyword?: string
    ): Promise<number> {
        let totalPosts;
        if (keyword) {
            totalPosts = await PostModel.find({
                examId: examIds,
                $or: [{ title: new RegExp(keyword, 'i') }, { content: new RegExp(keyword, 'i') }]
            }).countDocuments();
        } else {
            totalPosts = await PostModel.find({ examId: examIds }).countDocuments();
        }
        return Math.ceil(totalPosts / limit);
    }

    public static async getPostsByExamIdList(
        examIds: string[],
        pageNumber: number,
        limit: number,
        email?: string,
        keyword?: string
    ): Promise<IPostModel[]> {
        try {
            let posts;
            if (keyword) {
                posts = await PostModel.find({
                    examId: examIds,
                    $or: [
                        { title: new RegExp(keyword, 'i') },
                        { content: new RegExp(keyword, 'i') }
                    ]
                })
                    .sort({ createdAt: 'asc' })
                    .skip((pageNumber - 1) * limit)
                    .limit(limit);
            } else {
                posts = await PostModel.find({ examId: examIds })
                    .sort({ createdAt: 'asc' })
                    .skip((pageNumber - 1) * limit)
                    .limit(limit);
            }

            await setInteractionFields(email || '', posts);

            return posts;
        } catch (e) {
            return [];
        }
    }

    public static async getPostsByPostIdList(postIds: string[]): Promise<IPostModel[]> {
        try {
            return await PostModel.find({ _id: postIds });
        } catch (e) {
            return [];
        }
    }

    /**
     * Deletes the post with the given postId
     * @param postId
     * @return true if the post was successfully deleted. false otherwise
     */
    public static async deletePost(postId: string): Promise<boolean> {
        try {
            await PostModel.findByIdAndDelete(postId);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Fetches the Post with the given postId.
     * @param postId
     */
    public static async getPost(postId: string): Promise<IPostModel | null> {
        try {
            return await PostModel.findById(postId);
        } catch (e) {
            return null;
        }
    }

    public static async getPostsMadeByUser(
        userEmail: string,
        pageNumber: number,
        limit: number
    ): Promise<IPostModel[]> {
        try {
            const posts = await PostModel.find({ author: userEmail })
                .sort({ createdAt: 'asc' })
                .skip((pageNumber - 1) * limit)
                .limit(limit);

            await setInteractionFields(userEmail || '', posts);

            return posts;
        } catch (e) {
            return [];
        }
    }

    public static async getTotalNumOfPostPagesByUser(
        userEmail: string,
        limit: number
    ): Promise<number> {
        const totalPosts = await PostModel.find({ author: userEmail }).countDocuments();
        return Math.ceil(totalPosts / limit);
    }
}
