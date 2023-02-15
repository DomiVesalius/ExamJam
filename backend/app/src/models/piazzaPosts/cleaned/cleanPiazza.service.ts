import PiazzaPostModel, { IPiazzaPostModel } from './piazzaPost.model';
import PiazzaCommentModel, { CommentType, IPiazzaCommentModel } from './piazzaComment.model';
import { Schema } from 'mongoose';

interface CreatePiazzaPostFields {
    _id: string;
    courseCode: string;
    forumId: string;
    postNumber: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface CreateCommentFields {
    _id: string;
    postId: Schema.Types.String;
    type: CommentType;
    parentId: Schema.Types.String | string | null;
    content: string;
    children?: string[];
}

export class CleanPiazzaService {
    public static async createPiazzaPost(
        fields: CreatePiazzaPostFields
    ): Promise<IPiazzaPostModel | null> {
        try {
            return await PiazzaPostModel.create({
                ...fields,
                createdAt: new Date(fields.createdAt),
                comments: []
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public static async createComment(
        fields: CreateCommentFields
    ): Promise<IPiazzaCommentModel | null> {
        try {
            if (!fields.children) fields.children = [];
            return await PiazzaCommentModel.create({ ...fields });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
