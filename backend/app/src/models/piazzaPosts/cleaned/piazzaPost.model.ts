import mongoose, { Model, Schema, Document } from 'mongoose';
import { PiazzaCommentModelName } from './piazzaComment.model';

export const PiazzaPostModelName = 'PiazzaPost';

export interface IPiazzaPost {
    courseCode: string;
    forumId: string;
    postNumber: number;
    title: string;
    content: string;
    createdAt: Date;
}

export interface IPiazzaPostModel extends Document, IPiazzaPost {}

const PiazzaPostSchema = new Schema<IPiazzaPostModel>(
    {
        _id: { type: Schema.Types.String, required: true, unique: true },
        courseCode: { type: Schema.Types.String, required: true },
        forumId: { type: Schema.Types.String, required: true },
        postNumber: { type: Schema.Types.Number, required: true },
        title: { type: Schema.Types.String, required: true },
        content: { type: Schema.Types.String, required: false, default: '' }, // required is false because some posts have an empty body
        createdAt: { type: Schema.Types.Date, required: true }
    },
    { timestamps: false, versionKey: false, _id: false }
);

const PiazzaPostModel = mongoose.model<IPiazzaPostModel>(PiazzaPostModelName, PiazzaPostSchema);

export default PiazzaPostModel;
