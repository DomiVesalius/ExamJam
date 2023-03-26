import { BaseResponse } from '../base.controller';
import { ICommentModel } from '../../models/comments/comments.model';
import * as yup from 'yup';
import { CommentObject } from '../../models/comments/comments.service';

/**
 * POST /api/comments/
 */

export const validCreateCommentSchema = yup.object().shape({
    content: yup.string().min(1).required()
});

export interface CreateCommentBody {
    content: string;
    formatType?: string;
    postId: string;
    parentId?: string | null;
}

export interface CreateCommentResponse extends BaseResponse {
    data: ICommentModel | null;
}

/**
 * GET /api/comments/posts/:postId
 */

export interface GetCommentsResponse extends BaseResponse {
    /** Array of comments */
    data: CommentObject[];
    /** Page number to retrieve comments from */
    page: number;
    /** Amount of comments per page */
    limit: number;
    /** Total number of pages as per query of postId */
    totalPages: number;
}

/**
 * DELETE /comments/:commentId
 */
export interface DeleteCommentResponse extends BaseResponse {}

/**
 * PATCH /comments/:commentId
 */
export interface UpdateCommentBody {
    content: string;
}

export interface UpdateCommentResponse extends BaseResponse {
    data: ICommentModel | null;
}
