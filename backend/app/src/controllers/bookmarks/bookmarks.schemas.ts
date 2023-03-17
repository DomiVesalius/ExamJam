import { BaseResponse } from '../base.controller';
import { BookmarkType, IBookmarkModel } from '../../models/bookmarks/bookmark.model';
import { ICourseModel } from '../../models/courses/course.model';
import { IExamModel } from '../../models/exams/exam.model';
import { IPostModel } from '../../models/posts/post.model';

export interface GetBookmarksResponse extends BaseResponse {
    page: number;
    limit: number;
    totalPages: number;
    data: ICourseModel[] | IExamModel[] | IPostModel[];
}

export interface BookmarkCreationBody {
    type: BookmarkType;
    itemId: string;
}

export interface CreateBookmarkResponse extends BaseResponse {
    data: IBookmarkModel | null;
}
