import UserModel, { IUserModel } from './user.model';

export class UsersService {
    public static async getByEmail(email: string): Promise<IUserModel | null> {
        return UserModel.findOne({ email });
    }

    public static async createUser(
        email: string,
        username: string,
        password: string
    ): Promise<IUserModel | null> {
        try {
            return await UserModel.create({ email, username, password });
        } catch (e) {
            return null;
        }
    }
}
