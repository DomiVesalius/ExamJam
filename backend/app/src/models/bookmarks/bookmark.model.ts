import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmark {
    userEmail: string;
    type: string;
    courseCode: string;
    examId: string;
    postId: string
}

export enum BookmarkType {
    course = 'course',
    exam = 'exam',
    post = 'post'
}

export interface IBookmarkModel extends IBookmark, Document {}

// courseCode, examId, postId need to be populated depending on what is being saved
// not all 3 should be populated when creating a new bookmark.
const BookmarkSchema: Schema = new Schema(
    {
        userEmail: {type: Schema.Types.String, required: true, ref: 'User.email'},
        type: {type: Schema.Types.String, enum: BookmarkType, required: true},
        courseCode: {type: Schema.Types.String, ref: 'Course.courseCode'},
        examId: {type: Schema.Types.ObjectId, ref: 'Exam._id'},
        postId: {type: Schema.Types.ObjectId, ref: 'Post._id'},
    }
);
const BookmarkModel = mongoose.model<IBookmarkModel>('Bookmark', BookmarkSchema);

export default BookmarkModel;