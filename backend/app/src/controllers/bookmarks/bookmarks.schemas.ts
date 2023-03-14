import { BaseResponse } from '../base.controller';
import { BookmarkType, IBookmarkModel } from '../../models/bookmarks/bookmark.model';

export interface GetBookmarksResponse extends BaseResponse {
    page: number;
    limit: number;
    totalPages: number;
    data: IBookmarkModel[];
}

export interface BookmarkCreationBody {
    type: BookmarkType;
    itemId: string;
}

export interface CreateBookmarkResponse extends BaseResponse {
    data: IBookmarkModel | null;
}
