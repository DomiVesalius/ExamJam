import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICourse {
    courseCode: string;
    title: string;
    description: string;
    programArea: string;
}

export interface ICourseModel extends ICourse, Document {}

const CourseSchema: Schema =  new Schema({
    courseCode: {type: Schema.Types.String, required:true}, 
    title: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String, required: true},
    programArea: {type: Schema.Types.String, required: true},
}) 

const CourseModel = mongoose.model<ICourseModel>('Course', CourseSchema)

export default CourseModel
