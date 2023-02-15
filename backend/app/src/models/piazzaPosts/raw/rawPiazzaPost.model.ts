import mongoose, { Model, Schema } from 'mongoose';

/**
 * READ ME ===================================================================================
 * This model represents unfiltered/unclean data corresponding to a piazza post. It simply
 * stores some metadata about the post as well as the raw http response data for a certain
 * post.
 * It is unclean in the sense that it may contain irrelevant data. As such, this model will
 * not be exposed via HTTP endpoints and must be cleaned/filtered into another model possibly
 * called PiazzaPostModel.
 */

export interface IRawPiazzaPost {
    courseCode: string;
    forumId: string;
    data: object;
    postNumber: number;
    _id: string;
}

export interface IRawPiazzaPostModel extends IRawPiazzaPost, Document {}

const RawPiazzaPostSchema: Schema<IRawPiazzaPostModel> = new Schema<IRawPiazzaPostModel>(
    {
        _id: { type: Schema.Types.String, unique: true, index: true },
        courseCode: { type: Schema.Types.String, required: true },
        forumId: { type: Schema.Types.String, required: true },
        postNumber: { type: Schema.Types.Number, required: true },
        data: { type: Object, required: true }
    },
    { _id: false, versionKey: false, timestamps: false }
);

RawPiazzaPostSchema.pre(
    'save',
    async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
        // The id is set to be the endpoint at which this post is accessible
        // For example: piazza.com/class/lc2onqw5fuz6h5/post/117
        // The id will be set to class/lc2onqw5fuz6h5/post/117
        this._id = `class/${this.forumId}/post/${this.postNumber}`;
        return next();
    }
);

const RawPiazzaPostModel: Model<IRawPiazzaPostModel> = mongoose.model<IRawPiazzaPostModel>(
    'RawPiazzaPost',
    RawPiazzaPostSchema
);

export default RawPiazzaPostModel;
