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
    formatType: string;
    examId: string;
}

export interface GetPostsByExamId extends BaseResponse {
    page: number;
    limit: number;
    totalPages: number;
    data: IPostModel[];
}

export interface GetPostsByCourseCode extends BaseResponse {
    page: number;
    limit: number;
    totalPages: number;
    data: IPostModel[];
}

export interface DeletePostResponse extends BaseResponse {}

export interface PostVoteResponse extends BaseResponse {
    data: IPostModel | null;
}

export interface GetMyPostsResponse extends BaseResponse {
    page: number;
    limit: number;
    totalPages: number;
    data: IPostModel[];
}
