import CourseModel, { ICourseModel } from './course.model';

export class CoursesService {
    /**
     * Gets all courses that match the given keyword.
     * @param pageNumber number of page to be returned, should be > 0
     * @param limit number of courses per page, should be <= 10 and > 0
     * @param keyword keyword to be matched against courseCode and title
     */
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

    public static async getCoursesByCourseCodeList(courseCodes: string[]): Promise<ICourseModel[]> {
        try {
            return await CourseModel.find({ courseCode: courseCodes });
        } catch (e) {
            return [];
        }
    }

    /**
     * Gets the total number of courses that match the given keyword.
     * @param keyword keyword to be matched against courseCode and title
     */
    public static async getTotalNumCourses(keyword: string): Promise<number> {
        return CourseModel.find({
            $or: [{ title: new RegExp(keyword, 'i') }, { courseCode: new RegExp(keyword, 'i') }]
        }).countDocuments();
    }

    public static async getByCourseId(courseCode: string): Promise<ICourseModel | null> {
        courseCode = courseCode.toUpperCase();
        try {
            return await CourseModel.findOne({ courseCode });
        } catch (e) {
            return null;
        }
    }
}
