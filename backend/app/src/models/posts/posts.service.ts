import UserModel, { IUserModel } from '../user/user.model';
import PostModel, { IPostModel } from './post.model';
import { IPiazzaPost } from '../piazzaPosts/cleaned/piazzaPost.model';
import { CommentObject } from '../piazzaPosts/cleaned/cleanPiazza.service';
import CourseModel from '../courses/course.model';

export interface PostObject extends IPiazzaPost {
    _id: string;
    comments: CommentObject[];
}

export class PostsService {
    static async createPost(
        user: IUserModel,
        title: string,
        content: string,
        examId: string
    ): Promise<IPostModel | null> {
        try {
            return await PostModel.create({
                author: user.email,
                title,
                content,
                examId
            });
        } catch (e) {
            return null;
        }
    }

    public static async getTotalNumPosts(examIds: string[], limit: number): Promise<number> {
        const totalPosts = await PostModel.find({ examId: examIds }).countDocuments();
        return Math.ceil(totalPosts / limit);
    }

    public static async getPostsByCourseCode(
        courseCode: string,
        pageNumber: number,
        limit: number
    ) {}

    public static async getPostsByExamIdList(
        examIds: string[],
        pageNumber: number,
        limit: number
    ): Promise<IPostModel[]> {
        try {
            return await PostModel.find({ examId: examIds })
                .sort({ createdAt: 'asc' })
                .skip((pageNumber - 1) * limit)
                .limit(limit);
        } catch (e) {
            return [];
        }
    }
}
