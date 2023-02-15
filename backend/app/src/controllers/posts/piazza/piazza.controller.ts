import { Get, Path, Query, Route, Tags } from 'tsoa';
import { GetPiazzaPostsResponse } from './piazza.schemas';
import { CleanPiazzaService } from '../../../models/piazzaPosts/cleaned/cleanPiazza.service';
import { BaseController } from '../../base.controller';

@Tags('Piazza')
@Route('piazza')
export class PiazzaController extends BaseController {
    static MIN_PAGE = 1;
    static MIN_LIMIT = 1;
    static MAX_LIMIT = 50;
    @Get('{courseCode}')
    public async getPiazzaPostsForCourse(
        @Path() courseCode: string,
        @Query() page: number,
        @Query() limit: number
    ): Promise<GetPiazzaPostsResponse> {
        if (page < PiazzaController.MIN_PAGE || limit < PiazzaController.MIN_LIMIT) {
            this.setStatus(400);
            return {
                success: false,
                code: 400,
                page,
                limit,
                errors: ['page or limit query parameters are invalid'],
                data: []
            };
        }

        if (limit > PiazzaController.MAX_LIMIT) limit = PiazzaController.MAX_LIMIT;

        const posts = await CleanPiazzaService.getPostsOfCourse(
            courseCode.toUpperCase(),
            page,
            limit
        );

        let resBody: GetPiazzaPostsResponse;
        if (posts.length > 0) {
            resBody = {
                success: true,
                code: 200,
                page,
                limit,
                data: posts
            };
        } else {
            resBody = {
                success: false,
                code: 404,
                page,
                limit,
                errors: [
                    'Page and limit query parameters may be out of range',
                    'The provided course code may not exist'
                ],
                data: []
            };
        }

        this.setStatus(resBody.code);

        return resBody;
    }
}
