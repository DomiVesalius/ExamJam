import BookmarkModel, { BookmarkType, IBookmarkModel } from './bookmark.model';

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
}
