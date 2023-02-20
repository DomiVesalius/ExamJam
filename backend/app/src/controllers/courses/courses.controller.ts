import { BaseController } from '../base.controller';
import { Get, Query, Route, Tags, Request, Post, Body } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { CoursesService } from '../../models/courses/courses.service';
import courseModel, { ICourseModel } from '../../models/courses/course.model';
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
                errors: 'Invalid page number or limit',
                page: page,
                limit: limit,
                totalPages: -1
            };
        }

        const totalNumCourses = await CoursesService.getTotalNumCourses(keyword);
        const totalPages = Math.ceil(totalNumCourses / limit);

        if (totalPages < page) {
            return {
                success: false,
                code: 400,
                data: [],
                errors: 'Page number exceeds total number of pages',
                page: page,
                limit: limit,
                totalPages: totalPages
            };
        }

        const courseModels = await CoursesService.getCourses(page, limit, keyword);

        return {
            success: true,
            code: 200,
            data: courseModels,
            page: page,
            limit: limit,
            totalPages: totalPages
        };
    }
}
