import mongoose, { Model, Schema } from 'mongoose';
import { emailValidation } from './user.validators';

export interface IUser {
    username: string;
    email: string;
    active: boolean;
    password: string;
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
    password: { type: Schema.Types.String, required: true }
});

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);

export default UserModel;
