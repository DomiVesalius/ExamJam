import CommentModel, { ICommentModel } from './comments.model';
import { CreateCommentBody } from '../../controllers/comments/comments.schemas';

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
