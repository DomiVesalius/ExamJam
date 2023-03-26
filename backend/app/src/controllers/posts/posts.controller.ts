import { Body, Delete, Get, Path, Post, Query, Request, Route, Security, Tags } from 'tsoa';
import PassportStrategies from '../../middlewares/passport.middleware';
import { Request as ExpressRequest } from 'express';
import {
    CreatePostBody,
    CreatePostResponse,
    GetPostByIdResponse,
    GetPostsByCourseCode,
    GetPostsByExamId,
    DeletePostResponse
} from './posts.schemas';
import { BaseController } from '../base.controller';
import { UsersService } from '../../models/user/users.service';
import { PostsService } from '../../models/posts/posts.service';
import { ExamService } from '../../models/exams/exam.service';
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

        const post = await PostsService.createPost(
            user,
            body.title,
            body.content,
            body.examId,
            exam.courseCode
        );

        let res: CreatePostResponse;

        const data = post;
        const success = !!post;
        const code = success ? 201 : 500;

        res = { data, success, code };

        this.setStatus(res.code);
        return res;
    }

    @Security(PassportStrategies.local)
    @Get('courses/{courseCode}')
    public async getPostsByCourseCode(
        @Path() courseCode: string,
        @Query() page: number,
        @Query() limit: number,
        @Request() req: ExpressRequest,
        @Query() keyword?: string
    ): Promise<GetPostsByCourseCode> {
        const userEmail = req.user as string;

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

        const posts = await PostsService.getPostsByExamIdList(
            examIds,
            page,
            limit,
            userEmail,
            keyword
        );
        const totalPages = await PostsService.getTotalNumPosts(examIds, limit, keyword);

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

    @Security(PassportStrategies.local)
    @Get('exams/{examId}')
    public async getPostsByExamId(
        @Path() examId: string,
        @Query() page: number,
        @Query() limit: number,
        @Request() req: ExpressRequest,
        @Query() keyword?: string
    ): Promise<GetPostsByExamId> {
        const userEmail = req.user as string;

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

        let posts: IPostModel[] = await PostsService.getPostsByExamIdList(
            [examId],
            page,
            limit,
            userEmail,
            keyword
        );

        const totalPages = await PostsService.getTotalNumPosts([examId], limit, keyword);

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

    /**
     Gets Post with given postId
     * @param postId
     */
    @Get('{postId}')
    @Security(PassportStrategies.local)
    public async getPostById(@Path() postId: string): Promise<GetPostByIdResponse> {
        const post = await PostsService.getPost(postId);
        const code = post ? 200 : 404;
        const success = !!post;

        this.setStatus(code);

        return {
            code,
            success,
            data: post
        };
    }
}
