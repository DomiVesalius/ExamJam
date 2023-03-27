import mongoose, { Document, Schema } from 'mongoose';

export interface IVote {
    userEmail: string;
    type: string;
    postId: string; 
    commentId: string; 
}
export enum VoteType {
    up = 'up',
    down = 'down'
}

export interface IVoteModel extends IVote, Document {}

const VoteSchema: Schema = new Schema(
    {
        userEmail: { type: Schema.Types.String, required: true, ref: 'User.email' },
        type: { type: Schema.Types.String, enum: VoteType, required: true },
        examId: { type: Schema.Types.ObjectId, ref: 'Post._id' },
        postId: { type: Schema.Types.ObjectId, ref: 'Comment._id' }

    },
    { timestamps: true, versionKey: false }
);

const VoteModel = mongoose.model<IVoteModel>('Bookmark', VoteSchema);

export default VoteModel;
