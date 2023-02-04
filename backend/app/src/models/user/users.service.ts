import UserModel, { IUserModel } from './user.model';
import bcrypt from 'bcrypt';

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

    /**
     * Checks if the given plaintext password matches the hash+salt of the user
     * with the given email.
     * @param email identifies the user being compared to
     * @param password a plaintext password
     * @return false if the user does not exist or password does not match the hash. true otherwise
     */
    public static async comparePassword(email: string, password: string): Promise<boolean> {
        const user = await this.getByEmail(email);

        if (!user) return false;

        return bcrypt.compare(password, user.password);
    }
}