import UserModel, { IUserModel } from './user.model';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger.util';

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

    /**
     * Sets the 'active' field of the user with the given email to true if it exists.
     * Fails silently if no such user exists.
     * @param email the email of the user account to be activated
     */
    public static async activateUser(email: string): Promise<void> {
        try {
            await UserModel.updateOne({ email }, { active: true });
        } catch (e) {
            logger.error(`Failed to activate user account with email '${email}'`);
        }
    }

    /**
     * Given the email of the user, changes their password to the new one.
     * @param email an existing user in the database with this email
     * @param newPassword the new password to be updated to
     * @return true if the change was a success. false otherwise
     */
    public static async changePassword(email: string, newPassword: string): Promise<boolean> {
        const user = await UserModel.findOne({ email });

        if (!user) return false;

        user.password = newPassword;
        user.save();

        return true;
    }

    public static async changeUsername(email: string, newUsername: string): Promise<boolean> {
        const user = await UserModel.findOne({ email });

        if (!user) return false;

        user.username = newUsername;
        user.save();

        return true;
    }
}
