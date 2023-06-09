import { BaseResponse } from '../base.controller';
import { ICourseModel } from '../../models/courses/course.model';
import { IExamModel } from '../../models/exams/exam.model';

export interface CourseResponse extends BaseResponse {
    data: ICourseModel | null;
}

export interface GetExamsResponse extends BaseResponse {
    data: Array<IExamModel>;
}

export interface GetCoursesResponse extends BaseResponse {
    /**
     * Array of courses from the database
     */
    data: ICourseModel[];

    /**
     * Page number of courses returned
     */
    page: number;

    /**
     * Limit from request
     */
    limit: number;

    /**
     * Total number of pages as per matching results and limit
     * Calculated as: ceil(total number of matching results / limit)
     */
    totalPages: number;
}
