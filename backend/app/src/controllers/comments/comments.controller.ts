import { BaseController } from '../base.controller';
import { Body, Middlewares, Post, Route, Security, Tags, Request, Delete, Path, Patch } from 'tsoa';
import {
    CreateCommentBody,
    CreateCommentResponse,
    DeleteCommentResponse,
    UpdateCommentBody,
    UpdateCommentResponse,
    validCreateCommentSchema
} from './comments.schemas';
import validationMiddleware from '../../middlewares/validation.middleware';
import { RequestHandler, Request as ExpressRequest } from 'express';
import PassportStrategies from '../../middlewares/passport.middleware';
import { PostsService } from '../../models/posts/posts.service';
import { CommentsService } from '../../models/comments/comments.service';
import { getUserFromRequest } from '../../utils/helpers.util';

@Tags('Comments')
@Route('comments')
export class CommentsController extends BaseController {
    @Post('')
    @Security(PassportStrategies.local)
    @Middlewares<RequestHandler>(validationMiddleware(validCreateCommentSchema))
    public async createComment(
        @Request() req: ExpressRequest,
        @Body() body: CreateCommentBody
    ): Promise<CreateCommentResponse> {
        const userEmail = getUserFromRequest(req);

        const post = await PostsService.getPost(body.postId);

        if (!post) {
            this.setStatus(404);
            return {
                success: false,
                code: 404,
                data: null,
                errors: [`No such post with id ${body.postId}`]
            };
        }

        let parentComment = null;
        if (body.parentId) {
            parentComment = await CommentsService.getComment(body.parentId);

            if (!parentComment) {
                this.setStatus(404);
                return {
                    success: false,
                    code: 404,
                    data: null,
                    errors: [`No such parent comment with id ${body.parentId}`]
                };
            }

            // It is possible that the user is malicious and provided a parentId that is not a
            // comment for the post with the given postId
            if (parentComment.postId !== post.id) {
                this.setStatus(400);
                return {
                    success: false,
                    code: 400,
                    data: null,
                    errors: [
                        'The given parent comment id does not belong to the post with the given post id.'
                    ]
                };
            }
        }

        const creationFields = {
            ...body,
            author: userEmail,
            parentId: parentComment ? parentComment._id : null
        };

        const newComment = await CommentsService.createComment(creationFields);

        if (newComment && parentComment)
            await CommentsService.addReplyToComment(parentComment, newComment);

        const success = !!newComment;
        const code = newComment ? 201 : 500;

        this.setStatus(code);

        return { success, code, data: newComment };
    }

    @Delete('{commentId}')
    @Security(PassportStrategies.local)
    public async deleteComment(
        @Request() req: ExpressRequest,
        @Path() commentId: string
    ): Promise<DeleteCommentResponse> {
        const userEmail = getUserFromRequest(req);

        const comment = await CommentsService.getComment(commentId);

        if (!comment) {
            this.setStatus(404);
            return { success: false, code: 404, errors: [`No such comment with id ${commentId}`] };
        }

        if (userEmail !== comment.author) {
            this.setStatus(403);
            return {
                success: false,
                code: 403,
                errors: [`You are not authorized to delete that comment`]
            };
        }

        const success = await CommentsService.deleteComment(comment);
        const code = success ? 200 : 500;
        this.setStatus(code);

        return { success, code, message: 'Successfully deleted' };
    }

    @Patch('{commentId}')
    @Security(PassportStrategies.local)
    public async updateComment(
        @Request() req: ExpressRequest,
        @Path() commentId: string,
        @Body() body: UpdateCommentBody
    ): Promise<UpdateCommentResponse> {
        const userEmail = getUserFromRequest(req);

        const comment = await CommentsService.getComment(commentId);

        if (!comment) {
            this.setStatus(404);
            return {
                success: false,
                code: 404,
                data: null,
                errors: [`No such comment with id ${commentId}`]
            };
        }

        if (comment.author !== userEmail) {
            this.setStatus(403);
            return {
                success: false,
                code: 403,
                data: null,
                errors: [`User not authorized to modify comment with id ${commentId}`]
            };
        }

        const updatedComment = await CommentsService.updateCommentContent(comment, body.content);

        const success = !!updatedComment;
        const code = success ? 200 : 500;

        this.setStatus(code);

        return {
            success,
            code,
            data: updatedComment
        };
    }
}
