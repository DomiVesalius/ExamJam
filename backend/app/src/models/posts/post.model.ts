import mongoose, { Schema, Document } from 'mongoose';

export const PostModelName = 'Post';

export interface IPost {
    courseCode: string;
    author: string;
    title: string;
    content: string;
    examId: string;
}

export interface IPostModel extends Document, IPost {}

const PostSchema = new Schema<IPostModel>(
    {
        courseCode: { type: Schema.Types.String, required: true, ref: 'Course.courseCode' },
        author: { type: Schema.Types.String, required: true, ref: 'User._id' },
        title: { type: Schema.Types.String, required: true },
        content: { type: Schema.Types.String, required: true, default: '' },
        examId: { type: Schema.Types.String, required: true, ref: 'Exam._id' }
    },
    { timestamps: true, versionKey: false }
);

const PostModel = mongoose.model<IPostModel>(PostModelName, PostSchema);

export default PostModel;
