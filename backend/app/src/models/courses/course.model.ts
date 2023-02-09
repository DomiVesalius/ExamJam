import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICourse {
    courseCode: string;
    title: string;
    description: string;
    programArea: Array<string>;
    campuses: Array<string>;
}

export interface ICourseModel extends ICourse, Document {}

// programArea: string[]
// campus: string[]

const CourseSchema: Schema =  new Schema({
    courseCode: {type: Schema.Types.String, required:true}, 
    title: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String, required: true},
    programArea: {type: Array<Schema.Types.String>, required: true},
    campuses: {type: Array<Schema.Types.String>, required: true},
}, {collection : 'Course' }) 

const CourseModel = mongoose.model<ICourseModel>('Course', CourseSchema)

export default CourseModel