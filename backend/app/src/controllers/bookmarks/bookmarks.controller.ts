import { BaseController } from '../base.controller';
import { Get, Query, Route, Tags, Request, Security } from 'tsoa';
import { BookmarkType } from '../../models/bookmarks/bookmark.model';
import { Request as ExpressRequest } from 'express';
import PassportStrategies from '../../middlewares/passport.middleware';
import { BookmarksService } from '../../models/bookmarks/bookmarks.service';
import { GetBookmarksResponse } from './bookmarks.schemas';

@Tags('Bookmarks')
@Route('bookmarks')
export class BookmarksController extends BaseController {
    @Get('')
    @Security(PassportStrategies.local)
    public async getBookmarks(
        @Request() req: ExpressRequest,
        @Query() type: BookmarkType,
        @Query() page: number,
        @Query() limit: number
    ): Promise<GetBookmarksResponse> {
        const userEmail = req.user as string;

        const totalBookmarksOfType = await BookmarksService.getTotalNumBookmarksOfType(
            type,
            limit,
            userEmail
        );

        const bookmarks = await BookmarksService.getBookmarksOfType(type, userEmail, page, limit);

        return {
            success: true,
            code: 200,
            page,
            limit,
            totalPages: totalBookmarksOfType,
            data: bookmarks
        };
    }
}
