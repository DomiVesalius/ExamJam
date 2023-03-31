import mongoose, { Document, Schema } from 'mongoose';

export interface IVote {
    userEmail: string;
    type: string;
    itemId: string;
}
export enum VoteType {
    up = 'up', // upvote itemId
    down = 'down' // downvote itemId
}

export interface IVoteModel extends IVote, Document {}

const VoteSchema: Schema = new Schema(
    {
        userEmail: { type: Schema.Types.String, required: true, ref: 'User.email' },
        type: { type: Schema.Types.String, enum: VoteType, required: true },
        itemId: { type: Schema.Types.ObjectId, required: true }
    },
    { timestamps: true, versionKey: false }
);

const VoteModel = mongoose.model<IVoteModel>('Vote', VoteSchema);

export default VoteModel;
