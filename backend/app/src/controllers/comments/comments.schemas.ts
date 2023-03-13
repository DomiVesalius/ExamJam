import { BaseResponse } from '../base.controller';
import { ICommentModel } from '../../models/comments/comments.model';
import * as yup from 'yup';

/**
 * POST /api/comments/
 */

export const validCreateCommentSchema = yup.object().shape({
    content: yup.string().min(1).required()
});

export interface CreateCommentBody {
    content: string;
    postId: string;
    parentId?: string | null;
}

export interface CreateCommentResponse extends BaseResponse {
    data: ICommentModel | null;
}

export interface GetCommentsResponse extends BaseResponse {
    /** Array of comments */
    data: ICommentModel[] | null;
    /** Page number to retrieve comments from */
    page: number;
    /** Amount of comments per page */
    limit: number;
    /** Total number of pages as per query of postId */
    totalPages: number;
}
