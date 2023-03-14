import { BaseResponse } from '../base.controller';
import { IBookmarkModel } from '../../models/bookmarks/bookmark.model';

export interface GetBookmarksResponse extends BaseResponse {
    page: number;
    limit: number;
    totalPages: number;
    data: IBookmarkModel[];
}
