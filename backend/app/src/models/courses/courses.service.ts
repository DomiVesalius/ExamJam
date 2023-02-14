import CourseModel, { ICourseModel } from './course.model';
import logger from '../../utils/logger.util';

export class CoursesService {
    public static async getCourses(
        pageNumber: number,
        limit: number,
        keyword: string
    ): Promise<ICourseModel[]> {
        // TODO: Sort the results
        return CourseModel.find({
            $or: [
                { title: new RegExp('^' + keyword + '$', 'i') },
                { courseCode: new RegExp('^' + keyword + '$', 'i') },
                { description: new RegExp('^' + keyword + '$', 'i') }
            ]
        })
            .skip(pageNumber * limit)
            .limit(limit);
    }
}
