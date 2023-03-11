import { BaseResponse } from '../base.controller';
import { IPostModel } from '../../models/posts/post.model';

export interface CreatePostResponse extends BaseResponse {
    data: IPostModel | null;
}

export interface CreatePostBody {
    title: string;
    content: string;
    examId: string;
}

export interface GetPostsResponse extends BaseResponse {
    page: number;
    limit: number;
    totalPages: number;
    data: IPostModel[];
}
