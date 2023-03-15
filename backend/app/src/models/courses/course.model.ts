import mongoose, { Document, Schema } from 'mongoose';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { BookmarkType } from '../bookmarks/bookmark.model';

export interface ICourse {
    courseCode: string;
    title: string;
    description: string;
    programArea: Array<string>;
    campuses: Array<string>;
}

export interface ICourseModel extends ICourse, Document {}

// programArea: string[]
// campus: string[]

const CourseSchema: Schema = new Schema(
    {
        courseCode: { type: Schema.Types.String, required: true, unique: true },
        title: { type: Schema.Types.String, required: true },
        description: { type: Schema.Types.String, required: true },
        programArea: { required: true, type: Array<Schema.Types.String> },
        campuses: { required: true, type: Array<Schema.Types.String> }
    },
    { collection: 'Course', toJSON: { virtuals: true } }
);

CourseSchema.virtual('isBookmarked');

CourseSchema.methods.setIsBookmarked = async function (email: string) {
    const isBookmarked = await BookmarksService.getBookmark(
        this.courseCode,
        BookmarkType.course,
        email
    );

    this.isBookmarked = !!isBookmarked;
};

const CourseModel = mongoose.model<ICourseModel>('Course', CourseSchema);

export default CourseModel;
