import { BaseController } from '../base.controller';
import { CoursesService } from '../../models/courses/courses.service';
import { GetCoursesResponse, CourseResponse, GetExamsResponse } from './courses.schemas';
import { ExamService } from '../../models/exams/exam.service';
import { Get, Query, Route, Tags, Security, Path, Request } from 'tsoa';
import PassportStrategies from '../../middlewares/passport.middleware';
import { Request as ExpressRequest } from 'express';

@Tags('Courses')
@Route('courses')
export class CoursesController extends BaseController {
    @Get('{courseCode}')
    public async getCourse(@Path() courseCode: string): Promise<CourseResponse> {
        const course = await CoursesService.getByCourseId(courseCode);
        const code = course ? 200 : 404;
        this.setStatus(code);
        const success = !!course;
        return { data: course, success: success, code: code };
    }

    @Get('{courseCode}/exams')
    public async getExams(@Path() courseCode: string): Promise<GetExamsResponse> {
        const exams = await ExamService.getByCourseId(courseCode);
        const code = exams.length ? 200 : 404;
        this.setStatus(code);
        const success = !!exams.length;
        return { data: exams, success: success, code: code };
    }

    @Security(PassportStrategies.local)
    @Get('')
    public async getCourses(
        @Query() limit: number,
        @Query() page: number,
        @Query() keyword: string,
        @Request() req: ExpressRequest
    ): Promise<GetCoursesResponse> {
        const userEmail = req.user as string;

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

        const courseModels = await CoursesService.getCourses(page, limit, keyword, userEmail);

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
