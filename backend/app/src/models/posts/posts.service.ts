import UserModel, { IUserModel } from '../user/user.model';
import PostModel, { IPostModel } from './post.model';
import { IPiazzaPost } from '../piazzaPosts/cleaned/piazzaPost.model';
import { CommentObject } from '../piazzaPosts/cleaned/cleanPiazza.service';

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
}
