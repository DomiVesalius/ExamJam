import { Controller, Get, Route, Tags, Path, Middlewares } from 'tsoa';
import { ExamService } from '../../models/exams/exam.service';
import mongoose from 'mongoose';
import { Request, RequestHandler, Response } from 'express';
import { GetExamByIdResponse } from './exam.schemas';

const getExamFileMiddleware: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Get the course code and exam id from the request parameters
        const { examId } = req.params;
        // Get the exam from the database
        const exam = await ExamService.getExam(examId);
        if (!exam) {
            res.status(404);
            return 'Exam not found';
        }
        // Get the file id of the exam
        const files_id = exam.files_id;

        // If the file id is not found, return a 404 error
        if (!files_id) {
            res.status(404);
            return 'File not found';
        }

        // Set up a GridFS bucket
        const bucket = await new mongoose.mongo.GridFSBucket(mongoose.connection.db);

        const file = (await bucket.find(files_id).toArray())[0];
        if (!file) {
            res.status(404);
            return 'File not found';
        }
        const downloadStream = bucket.openDownloadStream(file._id);
        downloadStream.pipe(res);
        res.setHeader('Content-Disposition', `attachment; filename=./${files_id}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', `${file.length}`);
    } catch (err) {
        res.status(500);
        return 'Internal Server Error';
    }
};

@Route('exams')
@Tags('Exam')
export class ExamController extends Controller {
    @Get('files/{examId}')
    @Middlewares<RequestHandler>(getExamFileMiddleware)
    public async getFile(@Path() examId: string) {}

    @Get('{examId}')
    public async getExamById(@Path() examId: string): Promise<GetExamByIdResponse> {
        const examDoc = await ExamService.getExam(examId);

        const code = examDoc ? 200 : 404;
        const success = !!examDoc;

        this.setStatus(code);

        return {
            code,
            success,
            data: examDoc
        };
    }
}
