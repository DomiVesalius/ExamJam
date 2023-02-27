import { BaseResponse } from '../base.controller';
import {ICourseModel } from '../../models/courses/course.model';


export interface CourseResponse extends BaseResponse{
    data: ICourseModel | null
}
