import UserModel, { IUserModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger.util';
import PostModel, { IPostModel } from './post.model';

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

    /**
     * Deletes the post with the given postId
     * @param postId
     * @return true if the post was successfully deleted. false otherwise
     */
    public static async deletePost(postId: string): Promise<boolean> {
        try {
            await PostModel.deleteOne({ postId });
            return true;
        } catch (e) {
            return false;
        }
    }
}