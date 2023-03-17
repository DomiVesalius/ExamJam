import mongoose, { Schema, Document } from 'mongoose';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { BookmarkType } from '../bookmarks/bookmark.model';

export const PostModelName = 'Post';

export interface IPost {
    author: string;
    title: string;
    content: string;
    examId: string;
    courseCode: string;
}

export interface IPostModel extends Document, IPost {}

const PostSchema = new Schema<IPostModel>(
    {
        author: { type: Schema.Types.String, required: true, ref: 'User._id' },
        title: { type: Schema.Types.String, required: false, default: '' },
        content: { type: Schema.Types.String, required: false, default: '' },
        examId: { type: Schema.Types.String, required: true, ref: 'Exam._id' },
        courseCode: { type: Schema.Types.String, required: true, ref: 'Course.courseCode' }
    },
    { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

PostSchema.virtual('isBookmarked');

PostSchema.methods.setIsBookmarked = async function (email: string) {
    const isBookmarked = await BookmarksService.getBookmark(this._id, BookmarkType.post, email);
    this.isBookmarked = !!isBookmarked;
};

const PostModel = mongoose.model<IPostModel>(PostModelName, PostSchema);

export default PostModel;
