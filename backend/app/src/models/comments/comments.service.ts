import CommentModel, { ICommentModel } from './comments.model';
import { CreateCommentBody } from '../../controllers/comments/comments.schemas';

interface CreateCommentParams extends CreateCommentBody {
    author: string;
    parentId: string | null;
}

export interface CommentObject {
    _id: string;
    author: string;
    postId: string;
    parentId: string | null;
    content: string;
    children: ChildCommentObject[];
}

export interface ChildCommentObject {
    _id: string;
    author: string;
    postId: string;
    parentId: string | null;
    content: string;
    children: any[];
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
        if (comment.children.length === 0) {
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
    ): Promise<CommentObject[]> {
        try {
            const topLevelComments = await CommentModel.find({ postId: postId, parentId: null })
                .skip((pageNumber - 1) * limit)
                .limit(limit);

            const comments: CommentObject[] = [];

            for (const comment of topLevelComments) {
                const commentObj: CommentObject = {
                    _id: (await comment)._id,
                    author: comment.author,
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
                        author: childComment.author,
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
            return [];
        }
    }

    public static async getTotalNumComments(postId: string): Promise<number> {
        try {
            return await CommentModel.find({ postId: postId }).countDocuments();
        } catch (e) {
            return 0;
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

    public static async updateCommentContent(
        comment: ICommentModel,
        newContent: string
    ): Promise<ICommentModel | null> {
        try {
            comment.content = newContent;
            return await comment.save();
        } catch (e) {
            return null;
        }
    }

    public static async getCommentsMadeByUser(
        userEmail: string,
        pageNumber: number,
        limit: number
    ): Promise<ICommentModel[]> {
        try {
            return await CommentModel.find({ author: userEmail })
                .sort({ createdAt: 'asc' })
                .skip((pageNumber - 1) * limit)
                .limit(limit);
        } catch (e) {
            return [];
        }
    }

    public static async getTotalNumCommentPagesMadeByUser(
        userEmail: string,
        limit: number
    ): Promise<number> {
        try {
            const totalComments = await CommentModel.find({ author: userEmail }).countDocuments();
            return Math.ceil(totalComments / limit);
        } catch (e) {
            return 0;
        }
    }
}
