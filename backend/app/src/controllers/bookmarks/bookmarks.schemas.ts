import { BaseResponse } from '../base.controller';
import { IBookmarkModel } from '../../models/bookmarks/bookmark.model';

export interface CreateBookmarkResponse extends BaseResponse{
    data: IBookmarkModel|null;
}