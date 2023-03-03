import ExamModel, {IExamModel} from "../models/exams/exam.model";

export class ExamService {
    /**
     * Fetches the Exam with the given an Exam name.
     * @param examId
     */
    public static async getExam(examId: string): Promise<IExamModel | null> {
        try {
            const exam = await ExamModel.findById(examId);
            return exam;
        }
        catch (e) {
            return null;
        }
    }
}
