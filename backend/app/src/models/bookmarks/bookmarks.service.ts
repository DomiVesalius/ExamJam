import BookmarkModel, { BookmarkType, IBookmarkModel } from './bookmark.model';
import { CoursesService } from '../courses/courses.service';
import { ExamService } from '../exams/exam.service';
import { PostsService } from '../posts/posts.service';
import { ICourseModel } from '../courses/course.model';
import { IPostModel } from '../posts/post.model';
import { IExamModel } from '../exams/exam.model';

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
    ): Promise<ICourseModel[] | IPostModel[] | IExamModel[]> {
        try {
            let getBookmarkQuery = BookmarkModel.find({
                type,
                userEmail
            });

            let selectField; // The field in BookmarkModel that will be projected in the final query
            let getBookmarkEntityFunction; // The function that will be called to fetch the actual bookmarked items

            // Sorted by courseCode if of type course, otherwise sorted by time created
            if (type === BookmarkType.post) {
                selectField = 'postId';
                getBookmarkEntityFunction = PostsService.getPostsByPostIdList;
                getBookmarkQuery = getBookmarkQuery.sort({ createdAt: 'desc' });
            } else if (type === BookmarkType.exam) {
                selectField = 'examId';
                getBookmarkEntityFunction = ExamService.getExamsByExamIdList;
                getBookmarkQuery = getBookmarkQuery.sort({ createdAt: 'desc' });
            } else {
                selectField = 'courseCode';
                getBookmarkEntityFunction = CoursesService.getCoursesByCourseCodeList;
                getBookmarkQuery = getBookmarkQuery.sort({ courseCode: 'asc' });
            }

            // Paginating
            getBookmarkQuery = getBookmarkQuery.skip((pageNumber - 1) * limit).limit(limit);

            // Selecting the only useful field
            const bookmarkResults = await getBookmarkQuery.select(selectField);

            // Iterating through the results and gathering all the selected fields into a list
            // which will be used by the entity function as a filter
            const identifiers = [];
            for (const bookmark of bookmarkResults) {
                let identifier = (await bookmark).get(selectField);
                identifiers.push(identifier);
            }

            return await getBookmarkEntityFunction(identifiers);
        } catch (e) {
            return [];
        }
    }

    /**
     * Gets  the number of bookmarks of the given type that the user with the given email possesses.
     * @param type BookmarkType
     * @param limit page size
     * @param userEmail the email of the user the bookmarks belong to
     */
    public static async getTotalNumBookmarksOfType(
        type: BookmarkType,
        limit: number,
        userEmail: string
    ): Promise<number> {
        try {
            const numBookmarks = await BookmarkModel.find({ type, userEmail }).countDocuments();
            return Math.ceil(numBookmarks / limit);
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
