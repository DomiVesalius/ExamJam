import CourseModel, { ICourseModel } from './course.model'


export class CourseService {
    public static async getByCourseId(courseCode: string): Promise<ICourseModel | null> {
        courseCode = courseCode.toUpperCase()
        try{
            return await CourseModel.findOne({ courseCode });
        }
        catch(e){
            return null;
        }
    }
}
