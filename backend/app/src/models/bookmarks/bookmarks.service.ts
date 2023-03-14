import BookmarkModel, { BookmarkType, IBookmarkModel } from './bookmark.model';
import { CoursesService } from '../courses/courses.service';
import { ExamService } from '../exams/exam.service';
import { PostsService } from '../posts/posts.service';

interface ParamsInterface {
    userEmail: string;
    courseCode?: string;
    examId?: string;
    postId?: string;
    type: BookmarkType;
}

export class BookmarksService {
    /**
     * Gets a paginated list of bookmarks of the given type for the user with the given email.
     * @param type one of BookmarkType
     * @param userEmail the email of the user that the bookmarks belong to
     * @param pageNumber pagination parameter
     * @param limit pagination parameter
     */
    public static async getBookmarksOfType(
        type: BookmarkType,
        userEmail: string,
        pageNumber: number,
        limit: number
    ): Promise<IBookmarkModel[]> {
        try {
            return BookmarkModel.find({ type, userEmail })
                .sort({ createdAt: 'desc' })
                .skip((pageNumber - 1) * limit)
                .limit(limit);
        } catch (e) {
            return [];
        }
    }

    /**
     * Gets  the number of bookmarks of the given type that the user with the given email possesses.
     * @param type BookmarkType
     * @param userEmail the email of the user the bookmarks belong to
     */
    public static async getTotalNumBookmarksOfType(
        type: BookmarkType,
        limit: number,
        userEmail: string
    ): Promise<number> {
        try {
            return (await BookmarkModel.find({ type, userEmail }).countDocuments()) / limit;
        } catch (e) {
            return -1;
        }
    }

    private static async constructParams(
        itemId: string,
        type: BookmarkType,
        email: string
    ): Promise<ParamsInterface | null> {
        let parameters: ParamsInterface;
        let exists;
        switch (type) {
            case BookmarkType.course:
                exists = await CoursesService.getByCourseId(itemId);
                if (!exists) {
                    return null;
                }
                parameters = {
                    userEmail: email,
                    type: type,
                    courseCode: itemId.toUpperCase()
                };
                break;
            case BookmarkType.exam:
                exists = await ExamService.getExamById(itemId);
                if (!exists) {
                    return null;
                }
                parameters = {
                    userEmail: email,
                    type: type,
                    examId: itemId
                };
                break;
            case BookmarkType.post:
                exists = await PostsService.getPost(itemId);
                if (!exists) {
                    return null;
                }
                parameters = {
                    userEmail: email,
                    type: type,
                    postId: itemId
                };
                break;
        }
        return parameters;
    }

    public static async createBookmark(
        itemId: string,
        type: BookmarkType,
        email: string
    ): Promise<IBookmarkModel | null> {
        const params = await this.constructParams(itemId, type, email);
        if (!params) return null;

        try {
            return await BookmarkModel.create(params);
        } catch (e) {
            return null;
        }
    }

    public static async getBookmark(
        itemId: string,
        type: BookmarkType,
        email: string
    ): Promise<IBookmarkModel | null> {
        const params = await this.constructParams(itemId, type, email);
        if (!params) return null;

        try {
            return await BookmarkModel.findOne(params);
        } catch (e) {
            return null;
        }
    }

    public static async deleteBookmark(bookmarkId: string): Promise<boolean> {
        // const params = this.constructParams(itemId, type, email)
        try {
            await BookmarkModel.findByIdAndDelete(bookmarkId);
            return true;
        } catch (e) {
            return false;
        }
    }
}
