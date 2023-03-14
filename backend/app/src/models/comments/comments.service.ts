import CommentModel, { ICommentModel } from './comments.model';
import {
    ChildCommentObject,
    CommentObject,
    CreateCommentBody
} from '../../controllers/comments/comments.schemas';

interface CreateCommentParams extends CreateCommentBody {
    author: string;
    parentId: string | null;
}

export class CommentsService {
    /**
     * 'Delete' the given comment.
     *
     * If the comment has no parent comment or any children/replies, it is removed from the database.
     * Otherwise, the author and content will be set to '[removed]'.
     * @param comment
     */
    public static async deleteComment(comment: ICommentModel): Promise<boolean> {
        if (!comment.parentId && !comment.children) {
            try {
                await CommentModel.findByIdAndDelete(comment._id);
                return true;
            } catch (e) {
                return false;
            }
        }

        comment.author = '[removed]';
        comment.content = '[removed]';

        try {
            await comment.save();
            return true;
        } catch (e) {
            return false;
        }
    }

    public static async getComment(commentId: string): Promise<ICommentModel | null> {
        try {
            return await CommentModel.findById(commentId);
        } catch (e) {
            return null;
        }
    }

    /**
     * Given postId, returns an array of comments that are top level comments
     * (i.e. not replies to other comments). The top level comments will have parentId set to null.
     * Each comment object will have a children array that contains the replies to that comment.
     * @param pageNumber page number to retrieve comments from
     * @param limit amount of comments per page
     * @param postId ID of Post
     */
    public static async getCommentsByPost(
        pageNumber: number,
        limit: number,
        postId: string
    ): Promise<CommentObject[] | null> {
        try {
            const topLevelComments = await CommentModel.find({ postId: postId, parentId: null })
                .skip((pageNumber - 1) * limit)
                .limit(limit);

            const comments: CommentObject[] = [];

            for (const comment of topLevelComments) {
                const commentObj: CommentObject = {
                    _id: (await comment)._id,
                    postId: comment.postId.toString(),
                    parentId: comment.parentId ? comment.parentId.toString() : '',
                    content: comment.content,
                    children: []
                };
                for (const childId of comment.children) {
                    const childComment = await CommentModel.findById(childId);

                    if (!childComment) continue;

                    const childCommentObj: ChildCommentObject = {
                        _id: childComment._id,
                        postId: childComment.postId.toString(),
                        parentId: childComment.parentId ? childComment.parentId.toString() : '',
                        content: childComment.content,
                        children: []
                    };

                    commentObj.children.push(childCommentObj);
                }
                comments.push(commentObj);
            }
            return comments;
        } catch (e) {
            return null;
        }
    }

    public static async getTotalNumComments(postId: string): Promise<number | null> {
        try {
            return await CommentModel.find({ postId: postId }).countDocuments();
        } catch (e) {
            return null;
        }
    }

    public static async createComment(
        commentFields: CreateCommentParams
    ): Promise<ICommentModel | null> {
        try {
            return await CommentModel.create(commentFields);
        } catch (e) {
            return null;
        }
    }

    /**
     * Will mark the child parameter as a reply comment to the parent parameter. Essentially,
     * the child comment's ID will be added to the parent comments list of children.
     * @param parent the comment being replied to
     * @param child the reply comment
     */
    public static async addReplyToComment(
        parent: ICommentModel,
        child: ICommentModel
    ): Promise<void> {
        parent.children.push(child._id);
        await parent.save();
    }
}
