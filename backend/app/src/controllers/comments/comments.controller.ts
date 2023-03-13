import { BaseController } from '../base.controller';
import { Body, Middlewares, Post, Route, Security, Tags, Request, Query, Get } from 'tsoa';
import {
    ChildCommentObject,
    CommentObject,
    CreateCommentBody,
    CreateCommentResponse,
    GetCommentsResponse,
    validCreateCommentSchema
} from './comments.schemas';
import validationMiddleware from '../../middlewares/validation.middleware';
import { RequestHandler, Request as ExpressRequest } from 'express';
import PassportStrategies from '../../middlewares/passport.middleware';
import { PostsService } from '../../models/posts/posts.service';
import { CommentsService } from '../../models/comments/comments.service';
import { ICommentModel } from '../../models/comments/comments.model';

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

    /**
     * GET /api/comments/posts/
     * Get an array of comments based on limit (items per page), page, and post ID.
     * @param limit amount of comments per page
     * @param page page of comments to retrieve
     * @param postId ID of Post
     */
    @Get('posts')
    public async getComments(
        @Query() limit: number,
        @Query() page: number,
        @Query() postId: string
    ): Promise<GetCommentsResponse> {
        if (page <= 0 || limit <= 0 || limit > 10) {
            return {
                success: false,
                code: 400,
                data: null,
                page: page,
                limit: limit,
                totalPages: -1,
                errors: ['Invalid page number or limit']
            };
        }

        const invalidPostIdResponse: GetCommentsResponse = {
            success: false,
            code: 404,
            data: null,
            page: page,
            limit: limit,
            totalPages: -1,
            errors: [`No posts found with id ${postId}`]
        };

        const totalNumComments = await CommentsService.getTotalNumComments(postId);

        if (!totalNumComments) return invalidPostIdResponse;

        const totalPages = Math.ceil(totalNumComments / limit);

        if (totalPages < page) {
            return {
                success: false,
                code: 400,
                data: null,
                page: page,
                limit: limit,
                totalPages: totalPages,
                errors: ['Page number exceeds total number of pages']
            };
        }

        const commentsArray = await CommentsService.getCommentsByPost(page, limit, postId);
        if (!commentsArray) return invalidPostIdResponse;

        // Return the comments array like PiazzaComments structure
        let resultArray: CommentObject[] = [];
        for (let comment of commentsArray) {
            // if comment doesn't have parent comment
            // then comment is a parent comment
            if (!comment.parentId) {
                resultArray.push({
                    _id: comment._id,
                    postId: comment.postId,
                    parentId: comment.parentId,
                    content: comment.content,
                    children: []
                });
            } else {
                // comment is a reply
                // find parent comment
                const parentComment = resultArray.find((c) => {
                    if (c._id && comment.parentId) return c._id == comment.parentId.toString();
                });
                if (parentComment) {
                    const commentObj: CommentObject = {
                        _id: parentComment._id,
                        postId: parentComment.postId,
                        parentId: parentComment.parentId,
                        content: parentComment.content,
                        children: []
                    };
                    // add reply to parent comment
                    const reply: ChildCommentObject = {
                        _id: comment._id,
                        postId: comment.postId,
                        parentId: comment.parentId,
                        content: comment.content,
                        children: []
                    };
                    commentObj.children.push(reply);
                }
            }
        }

        return {
            success: true,
            code: 200,
            data: resultArray,
            page: page,
            limit: limit,
            totalPages: totalPages
        };
    }
}
