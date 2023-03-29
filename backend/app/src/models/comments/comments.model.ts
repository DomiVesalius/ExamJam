import mongoose, { Schema, Document } from 'mongoose';
import { VoteType } from '../votes/vote.models';
import { VotesService } from '../votes/votes.service';

export const CommentModelName = 'Comment';

export interface IComment {
    author: string;
    content: string;
    postId: Schema.Types.ObjectId;
    parentId: Schema.Types.ObjectId | null;
    children: Schema.Types.ObjectId[];
    upvotes: number;
    downvotes: number;
}

export interface ICommentModel extends Document, IComment {}

const CommentSchema = new Schema<ICommentModel>(
    {
        author: { type: Schema.Types.String, required: true, ref: 'User.email' },
        content: { type: Schema.Types.String, required: true },
        postId: { type: Schema.Types.String, required: true, ref: 'Post' },
        children: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        parentId: { type: Schema.Types.ObjectId, required: false, ref: CommentModelName },
        upvotes: { type: Schema.Types.Number, default: 0 },
        downvotes: { type: Schema.Types.Number, default: 0 }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: CommentModelName,
        toJSON: { virtuals: true }
    }
);

CommentSchema.virtual('isUpvoted');
CommentSchema.virtual('isDownvoted');

CommentSchema.methods.setIsVoted = async function (email: string) {
    const vote = await VotesService.getVote(email, this.id);
    if (!vote) {  
        this.isUpvoted = false;
        this.isDownvoted = false;
        return;
    }
    
    this.isUpvoted = vote.type === VoteType.up;
    this.isDownvoted = vote.type === VoteType.down;
}

const CommentModel = mongoose.model<ICommentModel>(CommentModelName, CommentSchema);

export default CommentModel;
