import { BaseResponse } from '../base.controller';
import { ICourseModel } from '../../models/courses/course.model';
import { IExamModel } from '../../models/exams/exam.model';

export interface CourseResponse extends BaseResponse {
    data: ICourseModel | null;
}

export interface GetExamsResponse extends BaseResponse {
    data: Array<IExamModel>;
}
