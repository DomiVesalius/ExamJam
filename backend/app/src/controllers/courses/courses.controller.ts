import { BaseController } from '../base.controller';
import { Get, Query, Route, Security, Tags } from 'tsoa';
import { CoursesService } from '../../models/courses/courses.service';
import { GetCoursesResponse } from './courses.schemas';
import PassportStrategies from '../../middlewares/passport.middleware';

@Tags('Courses')
@Route('courses')
export class CoursesController extends BaseController {
    @Get('')
    @Security(PassportStrategies.local)
    public async getCourses(
        @Query() limit: number,
        @Query() page: number,
        @Query() keyword: string
    ): Promise<GetCoursesResponse> {
        if (page <= 0 || limit <= 0 || limit > 10) {
            return {
                success: false,
                code: 400,
                data: [],
                errors: 'Invalid page number or limit',
                page: page,
                limit: limit,
                totalPages: -1
            };
        }

        const totalNumCourses = await CoursesService.getTotalNumCourses(keyword);
        const totalPages = Math.ceil(totalNumCourses / limit);

        if (totalPages < page) {
            return {
                success: false,
                code: 400,
                data: [],
                errors: 'Page number exceeds total number of pages',
                page: page,
                limit: limit,
                totalPages: totalPages
            };
        }

        const courseModels = await CoursesService.getCourses(page, limit, keyword);

        return {
            success: true,
            code: 200,
            data: courseModels,
            page: page,
            limit: limit,
            totalPages: totalPages
        };
    }
}
