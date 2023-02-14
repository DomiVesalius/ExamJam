import { BaseResponse } from '../base.controller';
import { ICourseModel } from '../../models/courses/course.model';

export interface GetCoursesResponse extends BaseResponse {
    data: ICourseModel[];
}
