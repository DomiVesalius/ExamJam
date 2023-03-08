import mongoose, { Schema, Document } from 'mongoose';

export const PostModelName = 'Post';

export interface IPost {
    courseCode: string;
    author: string;
    title: string;
    content: string;
}

export interface IPostModel extends Document, IPost {}

const PostSchema = new Schema<IPostModel>(
    {
        courseCode: { type: Schema.Types.String, required: true },
        author: { type: Schema.Types.String, required: true },
        title: { type: Schema.Types.String, required: true },
        content: { type: Schema.Types.String, required: true, default: '' }
    },
    { timestamps: true, versionKey: false }
);

const PostModel = mongoose.model<IPostModel>(PostModelName, PostSchema);

export default PostModel;
