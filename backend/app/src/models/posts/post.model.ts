import mongoose, { Schema, Document } from 'mongoose';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { BookmarkType } from '../bookmarks/bookmark.model';
import { VotesService } from '../votes/votes.service';

export const PostModelName = 'Post';

export interface IPost {
    author: string;
    title: string;
    content: string;
    examId: string;
    courseCode: string;
    upvotes: number;
    downvotes: number;
}

export interface IPostModel extends Document, IPost {}

const PostSchema = new Schema<IPostModel>(
    {
        author: { type: Schema.Types.String, required: true, ref: 'User._id' },
        title: { type: Schema.Types.String, required: false, default: '' },
        content: { type: Schema.Types.String, required: false, default: '' },
        examId: { type: Schema.Types.String, required: true, ref: 'Exam._id' },
        courseCode: { type: Schema.Types.String, required: true, ref: 'Course.courseCode' },
        upvotes: { type: Schema.Types.Number, default: 0 },
        downvotes: { type: Schema.Types.Number, default: 0 }
    },
    { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

PostSchema.virtual('isBookmarked');

// PostSchema.virtual('upvotes').get( async function () {
//     console.log(this.id)
//     const res = await VotesService.getNumUpvotes(this.id)
//     console.log(res)
//     return res;

// })

// PostSchema.virtual('downvotes').get(async function () {
//     console.log(this.id)
//     return await VotesService.getNumDownvotes(this.id);

// })

PostSchema.methods.setIsBookmarked = async function (email: string) {
    const isBookmarked = await BookmarksService.getBookmark(this._id, BookmarkType.post, email);
    this.isBookmarked = !!isBookmarked;
};

const PostModel = mongoose.model<IPostModel>(PostModelName, PostSchema);

export default PostModel;
