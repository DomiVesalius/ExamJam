import CourseModel, { ICourseModel } from './course.model';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger.util';

export class CoursesService {
    public static async getCourses(pageNumber: number, limit: number): Promise<ICourseModel[]> {}
}
