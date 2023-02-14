import { BaseController } from './base.controller';
import { Get, Query, Route, Tags, Request, Post, Body } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { CoursesService } from '../models/courses/courses.service';
import { ICourseModel } from '../models/courses/course.model';

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
        const courseResponse: GetCoursesResponse = {
            courseResults: []
        };

        CoursesService.getCourses(page, limit, keyword).then((courseModels) => {
            for (let courseModel of courseModels) {
                courseResponse.courseResults.push({
                    courseCode: courseModel.courseCode,
                    courseName: courseModel.title
                });
            }
        });

        return courseResponse;
    }
}
