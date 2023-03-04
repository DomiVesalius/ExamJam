import { BaseResponse } from '../base.controller';
import { IExamModel } from '../../models/exams/exam.model';

export interface GetExamByIdResponse extends BaseResponse {
    data: IExamModel | null;
}
