import UserModel, { IUserModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger.util';
import PostModel, { IPostModel } from './post.model';
import ExamModel, { IExamModel } from '../exams/exam.model';

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

    public static async getPostById(postId: string): Promise<IPostModel | null> {
        try {
            return await PostModel.findById(postId);
        } catch (e) {
            return null;
        }
    }
}
