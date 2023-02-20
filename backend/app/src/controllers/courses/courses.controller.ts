import { BaseController } from '../base.controller';
import { Get, Query, Route, Tags, Request, Post, Body } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { CoursesService } from '../../models/courses/courses.service';
import { ICourseModel } from '../../models/courses/course.model';
import { GetCoursesResponse } from './courses.schemas';

@Tags('Courses')
@Route('courses')
export class CoursesController extends BaseController {
    @Get('')
    public async getCourses(
        @Query() limit: number,
        @Query() page: number,
        @Query() keyword: string
    ): Promise<GetCoursesResponse> {
        if (page <= 0 || limit <= 0 || limit > 10) {
            return {
                success: false,
                code: 400,
                data: [],
                errors: 'Invalid page number or limit'
            };
        }
        const courseModels = await CoursesService.getCourses(page, limit, keyword);

        return {
            success: true,
            code: 200,
            data: courseModels
        };
    }
}
