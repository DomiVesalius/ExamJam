import VoteModel, { VoteType, IVoteModel } from './vote.models';
import { PostsService } from '../posts/posts.service';
import { CommentsService } from '../comments/comments.service';
import { IPostModel } from '../posts/post.model';
import { ICommentModel } from '../comments/comments.model';

export class VotesService {
    public static async placePostVote(
        userEmail: string,
        type: string,
        itemId: string
    ): Promise<IPostModel | null> {
        try {
            const doc = await VoteModel.findOne({ userEmail: userEmail, itemId: itemId });
            const post = await PostsService.getPost(itemId);

            if (!post) return null;

            const inc = type === VoteType.up ? 1 : -1;

            if (!doc) {
                await VoteModel.create({ userEmail, type, itemId });
                if (type === VoteType.up) post.upvotes += 1;
                if (type === VoteType.down) post.downvotes += 1;
            } else {
                if (
                    (doc.type === VoteType.down && type === VoteType.up) ||
                    (doc.type === VoteType.up && type === VoteType.down)
                ) {
                    await VoteModel.updateOne(
                        { _id: doc._id },
                        {
                            type
                        }
                    );

                    post.upvotes += inc;
                    post.downvotes -= inc;
                } else {
                    await VoteModel.deleteOne({ _id: doc._id });
                    if (type === VoteType.up) post.upvotes -= 1;
                    if (type === VoteType.down) post.downvotes -= 1;
                }
            }
            post.save();
            return post;
        } catch (e) {
            return null;
        }
    }

    public static async placeCommentVote(
        userEmail: string,
        type: string,
        itemId: string
    ): Promise<ICommentModel | null> {
        try {
            const doc = await VoteModel.findOne({ userEmail: userEmail, itemId: itemId });
            const comment = await CommentsService.getComment(itemId);

            if (!comment) return null;

            const inc = type === VoteType.up ? 1 : -1;

            if (!doc) {
                await VoteModel.create({ userEmail, type, itemId });
                if (type === VoteType.up) comment.upvotes += 1;
                if (type === VoteType.down) comment.downvotes += 1;
            } else {
                if (
                    (doc.type === VoteType.down && type === VoteType.up) ||
                    (doc.type === VoteType.up && type === VoteType.down)
                ) {
                    await VoteModel.updateOne(
                        { _id: doc._id },
                        {
                            type
                        }
                    );

                    comment.upvotes += inc;
                    comment.downvotes -= inc;
                } else {
                    await VoteModel.deleteOne({ _id: doc._id });
                    if (type === VoteType.up) comment.upvotes -= 1;
                    if (type === VoteType.down) comment.downvotes -= 1;
                }
            }

            comment.save();
            return comment;
        } catch (e) {
            return null;
        }
    }

    public static async getNumUpvotes(postId: string): Promise<number> {
        return await VoteModel.find({ itemId: postId, type: VoteType.up }).countDocuments();
    }

    public static async getNumDownvotes(postId: string): Promise<number> {
        return await VoteModel.find({ itemId: postId, type: VoteType.down }).countDocuments();
    }
}
