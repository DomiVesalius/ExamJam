import ExamModel, {IExamModel} from "./exam.model";

export class ExamService {
    /**
     * Fetches the Exam with the given an Exam name.
     * @param examId
     */
    public static async getExam(examId: string): Promise<IExamModel | null> {
        try {
            return await ExamModel.findById(examId);
        }
        catch (e) {
            return null;
        }
    }
}
