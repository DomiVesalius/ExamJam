import { BaseController } from '../base.controller';
import { Get, Query, Route, Tags, Request, Security, Body, Post } from 'tsoa';
import { BookmarkType } from '../../models/bookmarks/bookmark.model';
import { Request as ExpressRequest } from 'express';
import PassportStrategies from '../../middlewares/passport.middleware';
import { BookmarksService } from '../../models/bookmarks/bookmarks.service';
import {
    BookmarkCreationBody,
    CreateBookmarkResponse,
    GetBookmarksResponse
} from './bookmarks.schemas';

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

    @Security(PassportStrategies.local)
    @Post('')
    public async createBookmark(
        @Body() body: BookmarkCreationBody,
        @Request() req: ExpressRequest
    ) {
        const userEmail = req.user as string;
        const exists = await BookmarksService.getBookmark(body.itemId, body.type, userEmail);

        // if it's not null
        let ret: CreateBookmarkResponse;
        if (exists) {
            await BookmarksService.deleteBookmark(exists._id);
            ret = { data: null, success: true, code: 200 };
        } else {
            const bookmark = await BookmarksService.createBookmark(
                body.itemId,
                body.type,
                userEmail
            );

            if (bookmark) {
                ret = { data: bookmark, success: true, code: 200 };
            } else {
                ret = { data: bookmark, success: false, code: 404, errors: 'itemId not found' };
            }
        }

        this.setStatus(ret.code);
        return ret;
    }
}
