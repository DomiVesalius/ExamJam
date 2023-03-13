import { BaseResponse } from '../base.controller';

export interface GetCommentsResponse extends BaseResponse {
    data: string;
    page: number;
    limit: number;
    totalPages: number;
}
