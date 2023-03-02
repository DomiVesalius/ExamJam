import mongoose, { Model, Schema, Document } from 'mongoose';
import { PiazzaPostModelName } from './piazzaPost.model';

export const PiazzaCommentModelName = 'PiazzaComment';

export enum CommentType {
    studentAnswer = 's_answer',
    instructorAnswer = 'i_answer',
    followUp = 'followup',
    feedback = 'feedback'
}

export interface IPiazzaComment {
    postId: string;
    type: string;
    content: string;
    parentId: string | null;
    children: string[];
}

export interface IPiazzaCommentModel extends Document, IPiazzaComment {}

const PiazzaCommentSchema = new Schema<IPiazzaCommentModel>(
    {
        _id: { type: Schema.Types.String, required: true, unique: true },
        postId: { type: Schema.Types.String, required: true, ref: `${PiazzaPostModelName}._id` },
        type: { type: Schema.Types.String, enum: CommentType },
        content: { type: Schema.Types.String, required: false, default: '' }, // required is false because some comments have an empty body
        parentId: {
            type: Schema.Types.String,
            required: false,
            ref: `${PiazzaCommentModelName}._id`
        },
        children: [{ type: Schema.Types.String, ref: `${PiazzaCommentModelName}._id` }]
    },
    { timestamps: false, versionKey: false, _id: false }
);

const PiazzaCommentModel = mongoose.model<IPiazzaCommentModel>(
    PiazzaCommentModelName,
    PiazzaCommentSchema
);

export default PiazzaCommentModel;
