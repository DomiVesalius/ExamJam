import CourseModel, { ICourseModel } from './course.model';
import logger from '../../utils/logger.util';

export class CoursesService {
    public static async getCourses(
        pageNumber: number,
        limit: number,
        keyword: string
    ): Promise<ICourseModel[]> {
        return CourseModel.find({
            $or: [{ title: new RegExp(keyword, 'i') }, { courseCode: new RegExp(keyword, 'i') }]
        })
            .sort({ courseCode: 'asc', title: 'asc' })
            .skip((pageNumber - 1) * limit)
            .limit(limit);
    }
}
