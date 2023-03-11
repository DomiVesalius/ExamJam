import { BaseResponse } from '../base.controller';
import { IPostModel } from '../../models/posts/post.model';
import { string } from 'yup';

export interface CreatePostResponse extends BaseResponse {
    data: IPostModel | null;
}

export interface CreatePostBody {
    title: string;
    content: string;
    examId: string;
}

export interface DeletePostResponse extends BaseResponse {}
