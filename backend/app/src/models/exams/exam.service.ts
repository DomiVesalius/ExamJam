import ExamModel, { IExamModel } from './exam.model';

export class ExamService {
    public static async getByCourseId(courseCode: string): Promise<Array<IExamModel>> {
        courseCode = courseCode.toUpperCase();
        try {
            return await ExamModel.find({ courseCode });
        } catch (e) {
            return [];
        }
    }
}
