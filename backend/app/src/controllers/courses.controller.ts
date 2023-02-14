import { BaseController } from './base.controller';
import { Get, Query, Route, Tags, Request, Post, Body } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { CoursesService } from '../models/courses/courses.service';

interface GetCoursesResponse {
    courseResults: { courseCode: string; courseName: string }[];
}

@Tags('Courses')
@Route('courses')
export class CoursesController extends BaseController {
    @Get('')
    public async getCourses(
        @Query() limit: number,
        @Query() page: number,
        @Query() keyword: string
    ): Promise<GetCoursesResponse> {
        const csc148 = {
            courseCode: 'CSC148H5',
            courseName: 'Intro to CS'
        };

        const courses = await CoursesService.getCourses(page, limit, keyword);

        return { courseResults: [csc148] };
    }
}
