import { Get, Query, Route, Tags } from 'tsoa';
import { BaseController } from '../base.controller';
import { GetCommentsResponse } from './comments.schemas';

@Tags('Comments')
@Route('comments')
export class CommentsController extends BaseController {
    @Get('posts')
    public async getComments(
        @Query() limit: number,
        @Query() page: number,
        @Query() postId: number
    ): Promise<GetCommentsResponse> {
        return null;
    }
}
