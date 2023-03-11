import { Body, Get, Path, Post, Query, Request, Route, Security, Tags } from 'tsoa';
import PassportStrategies from '../../middlewares/passport.middleware';
import { Request as ExpressRequest } from 'express';
import {
    CreatePostBody,
    CreatePostResponse,
    GetAllPostsResponse,
    GetPostsByCourseCode,
    GetPostsByExamId
} from './posts.schemas';
import { BaseController } from '../base.controller';
import { UsersService } from '../../models/user/users.service';
import { PostsService } from '../../models/posts/posts.service';
import { ExamService } from '../../models/exams/exam.service';
import { GetPiazzaPostsResponse } from './piazza/piazza.schemas';
import { CleanPiazzaService } from '../../models/piazzaPosts/cleaned/cleanPiazza.service';
import { IExamModel } from '../../models/exams/exam.model';
import { IPostModel } from '../../models/posts/post.model';

@Tags('Post')
@Route('posts')
export class PostsController extends BaseController {
    static MIN_PAGE = 1;
    static MIN_LIMIT = 1;
    static MAX_LIMIT = 50;

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

    @Get('courses/{courseCode}')
    public async getPostsByCourseCode(
        @Path() courseCode: string,
        @Query() page: number,
        @Query() limit: number
    ): Promise<GetPostsByCourseCode> {
        if (page < PostsController.MIN_PAGE || limit < PostsController.MIN_LIMIT) {
            this.setStatus(400);
            return {
                success: false,
                code: 400,
                page,
                limit,
                totalPages: -1,
                errors: ['page or limit query parameters are invalid'],
                data: []
            };
        }

        if (limit > PostsController.MAX_LIMIT) limit = PostsController.MAX_LIMIT;

        const exams = await ExamService.getByCourseId(courseCode);

        // Gets the ids of all  the exams
        const examIds: string[] = [];
        for (const exam of exams) {
            examIds.push(exam._id);
        }

        const posts = await PostsService.getPostsByExamIdList(examIds, page, limit);

        let resBody: GetPostsByExamId;
        if (posts.length > 0) {
            resBody = {
                success: true,
                code: 200,
                page,
                limit,
                totalPages: -100,
                data: posts
            };
        } else {
            resBody = {
                success: false,
                code: 404,
                page,
                limit,
                totalPages: 0,
                errors: [
                    'Page and limit query parameters may be out of range',
                    'The provided course code may not exist'
                ],
                data: []
            };
        }

        this.setStatus(resBody.code);

        return resBody;
    }

    @Get('exams/{examId}')
    public async getPostsByExamId(
        @Path() examId: string,
        @Query() page: number,
        @Query() limit: number
    ): Promise<GetPostsByExamId> {
        if (page < PostsController.MIN_PAGE || limit < PostsController.MIN_LIMIT) {
            this.setStatus(400);
            return {
                success: false,
                code: 400,
                page,
                limit,
                totalPages: -1,
                errors: ['page or limit query parameters are invalid'],
                data: []
            };
        }

        if (limit > PostsController.MAX_LIMIT) limit = PostsController.MAX_LIMIT;

        let posts: IPostModel[] = await PostsService.getPostsByExamIdList([examId], page, limit);

        const totalPages = await PostsService.getTotalNumPosts([examId], limit);

        let resBody: GetPostsByExamId;
        if (posts.length > 0) {
            resBody = {
                success: true,
                code: 200,
                page,
                limit,
                totalPages,
                data: posts
            };
        } else {
            resBody = {
                success: false,
                code: 404,
                page,
                limit,
                totalPages,
                errors: [
                    'Page and limit query parameters may be out of range',
                    'The provided course code may not exist'
                ],
                data: []
            };
        }

        this.setStatus(resBody.code);

        return resBody;
    }
}
