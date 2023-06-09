import ExamModel, { IExamModel } from './exam.model';
import { setInteractionFields } from '../models.helpers';

export class ExamService {
    /**
     * Fetches the Exam with the given an Exam name.
     * @param examId
     */
    public static async getExam(examId: string): Promise<IExamModel | null> {
        try {
            return await ExamModel.findById(examId);
        } catch (e) {
            return null;
        }
    }

    public static async getByCourseId(
        courseCode: string,
        email?: string
    ): Promise<Array<IExamModel>> {
        courseCode = courseCode.toUpperCase();
        try {
            const exams = await ExamModel.find({ courseCode });
            await setInteractionFields(email || '', exams);
            return exams;
        } catch (e) {
            return [];
        }
    }

    public static async getExamById(examId: string): Promise<IExamModel | null> {
        try {
            return await ExamModel.findById(examId);
        } catch (e) {
            return null;
        }
    }

    public static async getExamsByExamIdList(examIds: string[]): Promise<IExamModel[]> {
        try {
            return await ExamModel.find({ _id: examIds });
        } catch (e) {
            return [];
        }
    }
}
