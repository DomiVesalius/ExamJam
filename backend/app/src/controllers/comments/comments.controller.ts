import { BaseController } from '../base.controller';
import { Body, Middlewares, Post, Route, Security, Tags, Request } from 'tsoa';
import {
    CreateCommentBody,
    CreateCommentResponse,
    validCreateCommentSchema
} from './comments.schemas';
import validationMiddleware from '../../middlewares/validation.middleware';
import { RequestHandler, Request as ExpressRequest } from 'express';
import PassportStrategies from '../../middlewares/passport.middleware';
import { PostsService } from '../../models/posts/posts.service';
import { CommentsService } from '../../models/comments/comments.service';

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
        const userEmail = req.user as string;

        const post = await PostsService.getPost(body.postId);

        if (!post)
            return {
                success: false,
                code: 404,
                data: null,
                errors: [`No such post with id ${body.postId}`]
            };

        let parentComment = null;
        if (body.parentId) {
            parentComment = await CommentsService.getComment(body.parentId);

            if (!parentComment)
                return {
                    success: false,
                    code: 404,
                    data: null,
                    errors: [`No such parent comment with id ${body.parentId}`]
                };
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
}
