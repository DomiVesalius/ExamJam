import RawPiazzaPostModel, { IRawPiazzaPostModel } from './rawPiazzaPost.model';

export class RawPiazzaPostService {
    public static async create(
        data: object,
        courseCode: string,
        postNumber: number,
        forumId: string
    ): Promise<IRawPiazzaPostModel | null> {
        try {
            return await RawPiazzaPostModel.create({
                data,
                courseCode,
                postNumber,
                forumId
            });
        } catch (e) {
            return null;
        }
    }

    public static async get(
        forumId: string,
        postNumber: number
    ): Promise<IRawPiazzaPostModel | null> {
        try {
            return await RawPiazzaPostModel.findOne({ forumId, postNumber });
        } catch (e) {
            return null;
        }
    }

    public static async getAll(): Promise<Array<IRawPiazzaPostModel> | []> {
        try {
            return await RawPiazzaPostModel.find({});
        } catch (e) {
            return [];
        }
    }
}
