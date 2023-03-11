import { BaseResponse } from '../base.controller';
import { IPostModel } from '../../models/posts/post.model';

export interface CreatePostResponse extends BaseResponse {
    data: IPostModel | null;
}

export interface GetPostByIdResponse extends BaseResponse {
    data: IPostModel | null;
}

export interface CreatePostBody {
    title: string;
    content: string;
    examId: string;
}
