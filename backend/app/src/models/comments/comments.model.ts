import mongoose, { Schema, Document } from 'mongoose';

export const CommentModelName = 'Comment';

export interface IComment {
    author: string;
    content: string;
    postId: Schema.Types.ObjectId;
    parentId: Schema.Types.ObjectId | null;
    children: Schema.Types.ObjectId[];
}

export interface ICommentModel extends Document, IComment {}

const CommentSchema = new Schema<ICommentModel>(
    {
        author: { type: Schema.Types.String, required: true, ref: 'User.email' },
        content: { type: Schema.Types.String, required: true },
        postId: { type: Schema.Types.String, required: true, ref: 'Post' },
        children: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        parentId: { type: Schema.Types.ObjectId, required: false, ref: CommentModelName }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: CommentModelName
    }
);

const CommentModel = mongoose.model<ICommentModel>(CommentModelName, CommentSchema);

export default CommentModel;
