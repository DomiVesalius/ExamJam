import CourseModel, { ICourseModel } from './course.model';
import logger from '../../utils/logger.util';

export class CoursesService {
    public static async getCourses(
        pageNumber: number,
        limit: number,
        keyword: string
    ): Promise<ICourseModel[]> {
        return CourseModel.find({
            // TODO: fix regex... not working as intended
            $or: [
                { title: new RegExp('^' + keyword + '$', 'i') },
                { courseCode: new RegExp('^' + keyword + '$', 'i') },
                { description: new RegExp('^' + keyword + '$', 'i') }
            ]
        })
            .sort({ title: 'asc', courseCode: 'asc', description: 'asc' })
            .skip((pageNumber - 1) * limit)
            .limit(limit);
    }
}
