import { Get, Path, Query, Route, Tags } from 'tsoa';
import { GetPiazzaPostResponse, GetPiazzaPostsResponse } from './piazza.schemas';
import { CleanPiazzaService } from '../../../models/piazzaPosts/cleaned/cleanPiazza.service';
import { BaseController } from '../../base.controller';

@Tags('Piazza')
@Route('piazza')
export class PiazzaController extends BaseController {
    static MIN_PAGE = 1;
    static MIN_LIMIT = 1;
    static MAX_LIMIT = 50;

    /**
     * Retrieves posts related to the given course code with pagination parameters
     * @param courseCode Must be a valid code for a course at UofT
     * @param page page number
     * @param limit the max amount of records to retrieve
     */
    @Get('courses/{courseCode}')
    public async getPiazzaPostsForCourse(
        @Path() courseCode: string,
        @Query() page: number,
        @Query() limit: number
    ): Promise<GetPiazzaPostsResponse> {
        courseCode = courseCode.toUpperCase();
        if (page < PiazzaController.MIN_PAGE || limit < PiazzaController.MIN_LIMIT) {
            this.setStatus(400);
            return {
                success: false,
                code: 400,
                page,
                limit,
                totalPages: -1,
                errors: ['page or limit query parameters are invalid'],
                data: []
            };
        }

        if (limit > PiazzaController.MAX_LIMIT) limit = PiazzaController.MAX_LIMIT;

        const totalPiazzaPosts = await CleanPiazzaService.getTotalNumberOfPosts(courseCode);
        const totalPages = Math.ceil(totalPiazzaPosts / limit);

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
                totalPages,
                data: posts
            };
        } else {
            resBody = {
                success: false,
                code: 404,
                page,
                limit,
                totalPages,
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

    /**
     * Retrieves data (including comments) for a piazza post with the given id
     * @param forumId the id of the original piazza forum that the post was scraped from
     * @param postNumber the number of the original post on the original piazza forum
     */
    @Get('forums/{forumId}/posts/{postNumber}')
    public async getPiazzaPost(
        @Path() forumId: string,
        @Path() postNumber: number
    ): Promise<GetPiazzaPostResponse> {
        const piazzaPost = await CleanPiazzaService.getPost(forumId, postNumber);

        const code = piazzaPost ? 200 : 404; // 404 if piazza post is null
        const success = !!piazzaPost; // true if not null, else false

        this.setStatus(code);

        return { success, code, data: piazzaPost };
    }
}
