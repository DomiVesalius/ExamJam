import UserModel, { IUserModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger.util';
import PostModel, { IPostModel } from './post.model';

export class PostsService {
    static async createPost(
        user: IUserModel,
        courseCode: string,
        title: string,
        content: string,
        examId: string
    ): Promise<IPostModel | null> {
        try {
            return await PostModel.create({
                courseCode: courseCode.toUpperCase(),
                author: user.email,
                title,
                content,
                examId
            });
        } catch (e) {
            return null;
        }
    }
}
