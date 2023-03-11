import { Body, Delete, Path, Post, Request, Route, Security, Tags } from 'tsoa';
import PassportStrategies from '../../middlewares/passport.middleware';
import { Request as ExpressRequest } from 'express';
import { CreatePostBody, CreatePostResponse, DeletePostResponse } from './posts.schemas';
import { BaseController } from '../base.controller';
import { UsersService } from '../../models/user/users.service';
import { PostsService } from '../../models/posts/posts.service';
import { ExamService } from '../../models/exams/exam.service';

@Tags('Post')
@Route('posts')
export class PostsController extends BaseController {
    /**
     Creates Post with given Body parameters
     * @param req
     * @param body
     */
    @Security(PassportStrategies.local)
    @Post('')
    public async post(
        @Request() req: ExpressRequest,
        @Body() body: CreatePostBody
    ): Promise<CreatePostResponse> {
        let userEmail = req.user as string;

        const user = await UsersService.getByEmail(userEmail);

        if (!user) {
            this.setStatus(401);
            return {
                success: false,
                code: 401,
                errors: ['User with that email does not exist'],
                data: null
            };
        }

        const exam = await ExamService.getExam(body.examId);

        if (!exam) {
            this.setStatus(404);
            return {
                success: false,
                code: 404,
                errors: [`Exam with id '${body.examId}' not found`],
                data: null
            };
        }

        const post = await PostsService.createPost(user, body.title, body.content, body.examId);

        let res: CreatePostResponse;

        const data = post;
        const success = !!post;
        const code = success ? 201 : 500;

        res = { data, success, code };

        this.setStatus(res.code);
        return res;
    }

    @Security(PassportStrategies.local)
    @Delete('{postId}')
    public async deletePost(
        @Request() req: ExpressRequest,
        @Path() postId: string
    ): Promise<DeletePostResponse> {
        const post = await PostsService.getPost(postId);
        let userEmail = req.user as string;

        if (!post) {
            this.setStatus(404);
            return {
                success: false,
                code: 404,
                errors: [`Post with id '${postId}' not found`]
            };
        }

        if (post.author !== userEmail) {
            this.setStatus(403);
            return {
                success: false,
                code: 403,
                errors: [`User not author of Post with id '${postId}'`]
            };
        }

        const result = await PostsService.deletePost(postId);

        const resBody: DeletePostResponse = {
            code: result ? 200 : 500,
            success: result
        };

        this.setStatus(resBody.code);
        return resBody;
    }
}
