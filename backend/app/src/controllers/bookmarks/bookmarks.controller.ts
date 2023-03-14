import { BaseController } from '../base.controller';
import { Get, Post, Body, Query, Route, Tags, Security, Path, Request} from 'tsoa';
import { BookmarkType } from '../../models/bookmarks/bookmark.model';
import PassportStrategies from '../../middlewares/passport.middleware';
import {Request as ExpressRequest } from 'express';
import { BookmarkService } from '../../models/bookmarks/bookmarks.service';
import { CreateBookmarkResponse } from './bookmarks.schemas';

interface BookmarkCreationBody {
    type: BookmarkType
    itemId: string
}

@Tags('Bookmarks')
@Route('bookmarks')
export class BookmarksController extends BaseController {
    @Security(PassportStrategies.local)
    @Post('')
    public async createBookmark(
        @Body() body: BookmarkCreationBody,
        @Request() req: ExpressRequest,
    ){
        
        const userEmail = req.user as string;
        const exists = await BookmarkService.getBookmark(body.itemId, body.type, userEmail)
            // if its not null
        let ret: CreateBookmarkResponse
        if (exists){
             await BookmarkService.deleteBookmark(exists._id)
             ret = {data: null, success: true, code: 200}
            
        }
        else{
            const bookmark = await BookmarkService.createBookmark(body.itemId, body.type, userEmail)
            console.log("bookmark:::::  ",bookmark)
            if(bookmark){
                ret = {data: bookmark, success: true, code: 200}
            }
            else{
                ret = {data: bookmark, success: false, code: 404, errors: 'itemId not found'}
            }
           
        }
        this.setStatus(ret.code)
        return ret
 
       
    }


}
