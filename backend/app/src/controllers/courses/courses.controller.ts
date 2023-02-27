import { BaseController, } from '../base.controller';
import { Get, Route, Tags, Request, Path } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { CourseService } from '../../models/courses/courses.service';
import { CourseResponse } from './courses.schema';


@Tags('Courses')
@Route('courses')
export class CoursesController extends BaseController {
    @Get("{courseCode}")
    public async getCourse(
        @Request() req: ExpressRequest,
        @Path() courseCode: string
    ): Promise<CourseResponse> {
        const course = await CourseService.getByCourseId(courseCode)
        const code = course ? 200 : 404;
        this.setStatus(code)
        const success = course ? true : false;
        return { data: course, success: success, code: code };
    }
}
