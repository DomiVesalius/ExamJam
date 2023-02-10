import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import { emailValidation } from './user.validators';

export interface IUser {
    username: string;
    email: string;
    active: boolean;
    password: string;
    bio: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    username: { type: Schema.Types.String, required: true },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        validate: emailValidation
    },
    active: { type: Schema.Types.Boolean, default: false },
    password: { type: Schema.Types.String, required: true },
    bio: { type: Schema.Types.String, default: '' }
});

/**
 * This pre hook will hash a users password everytime it is modified.
 * Ensures that passwords are not stored as plaintext.
 */
UserSchema.pre('save', async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    return next();
});

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);

export default UserModel;
