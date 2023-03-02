import { BaseController, } from '../base.controller';
import { Get, Route, Tags, Path } from 'tsoa';
import { CourseService } from '../../models/courses/courses.service';
import { CourseResponse, GetExamsResponse } from './courses.schema';
import { ExamService } from '../../models/exams/exam.service';

@Tags('Courses')
@Route('courses')
export class CoursesController extends BaseController {
    @Get("{courseCode}")
    public async getCourse(
        @Path() courseCode: string
    ): Promise<CourseResponse> {
        const course = await CourseService.getByCourseId(courseCode)
        const code = course ? 200 : 404;
        this.setStatus(code)
        const success = course ? true : false;
        return { data: course, success: success, code: code };
    }

    @Get("{courseCode}/exams")
    public async getExams(
        @Path() courseCode: string
    ): Promise<GetExamsResponse> {
        const exams = await ExamService.getByCourseId(courseCode)
        const code = exams ? 200 : 404;
        this.setStatus(code)
        const success = exams ? true : false;
        return { data: exams, success: success, code: code };
    }
}


