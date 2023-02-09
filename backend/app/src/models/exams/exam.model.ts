import mongoose, { Document, Model, Schema } from "mongoose";

export interface IExam {
    courseCode: string;
    title: string;
    link: string;
    files_id: string;
}

export interface IExamModel extends IExam, Document {}

const ExamSchema: Schema =  new Schema({
    courseCode: {type: Schema.Types.String, required:true}, 
    title: {type: Schema.Types.String, required: true},
    link: {type: Schema.Types.String, required: true},
    files_id: {type: Schema.Types.ObjectId, required: true},
    
}, {collection : 'Exam' }) 

const ExamModel = mongoose.model<IExamModel>('Exam', ExamSchema)

export default ExamModel
