import { Body, Post, Request, Route, Security, Tags } from 'tsoa';
import PassportStrategies from '../../middlewares/passport.middleware';
import { Request as ExpressRequest } from 'express';
import { CreatePostBody, CreatePostResponse } from './posts.schemas';
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
}
