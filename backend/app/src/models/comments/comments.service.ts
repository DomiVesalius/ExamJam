import CommentModel, { ICommentModel } from './comments.model';
import { CreateCommentBody } from '../../controllers/comments/comments.schemas';

interface CreateCommentParams extends CreateCommentBody {
    author: string;
    parentId: string | null;
}

export class CommentsService {
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
