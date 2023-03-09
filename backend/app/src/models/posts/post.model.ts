import mongoose, { Schema, Document } from 'mongoose';

export const PostModelName = 'Post';

export interface IPost {
    author: string;
    title: string;
    content: string;
    examId: string;
}

export interface IPostModel extends Document, IPost {}

const PostSchema = new Schema<IPostModel>(
    {
        author: { type: Schema.Types.String, required: true, ref: 'User._id' },
        title: { type: Schema.Types.String, required: false, default: '' },
        content: { type: Schema.Types.String, required: false, default: '' },
        examId: { type: Schema.Types.String, required: true, ref: 'Exam._id' }
    },
    { timestamps: true, versionKey: false }
);

const PostModel = mongoose.model<IPostModel>(PostModelName, PostSchema);

export default PostModel;
