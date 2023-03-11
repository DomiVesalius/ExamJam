import { IUserModel } from '../user/user.model';
import PostModel, { IPostModel } from './post.model';

export class PostsService {
    public static async createPost(
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
}
