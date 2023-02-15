import { BaseResponse } from '../../base.controller';
import { PostObject } from '../../../models/piazzaPosts/cleaned/cleanPiazza.service';

export interface GetPiazzaPostsResponse extends BaseResponse {
    page: number;
    limit: number;
    data: PostObject[];
}
