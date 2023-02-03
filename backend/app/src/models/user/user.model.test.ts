import UserModel from './user.model';
import { emailValidation } from './user.validators';

import { TestUtil } from '../../utils/test.util';
import { Error, MongooseError } from 'mongoose';

describe('User Model', () => {
    beforeAll(async () => {
        await TestUtil.connectToTestDatabase();
    });

    afterEach(async () => {
        await TestUtil.removeAllDocuments();
    });

    afterAll(async () => {
        await TestUtil.disconnectFromTestDatabase();
    });

    test('Cannot save without all required fields', async () => {
        const user = new UserModel({
            username: 'John Doe',
            email: 'john.doe@mail.utoronto.ca'
        });

        expect(user.validateSync()).not.toBe(undefined);
    });

    test('Cannot save user with non-uoft email address', async () => {
        const user = new UserModel({
            username: 'John Doe',
            email: 'john@gmail.com',
            password: 'pass123'
        });

        const error = user.validateSync();
        expect(error?.errors['email'].message).toBe(emailValidation.message({ value: user.email }));
    });

    test("Not specifying 'active' field defaults to false", async () => {
        const user = new UserModel({
            username: 'John Doe',
            email: 'john.doe@mail.utoronto.ca',
            password: 'pass123'
        });

        expect(user.active).toBe(false);
    });

    test('Passwords get hashed + salted', async () => {
        const user = await UserModel.create({
            username: 'John Doe',
            email: 'john.doe@mail.utoronto.ca',
            password: 'pass123'
        });

        expect(user.password).not.toBe('pass123');
    });

    test('Emails are unique', async () => {
        const user = await UserModel.create({
            username: 'John Doe',
            email: 'john.doe@mail.utoronto.ca',
            password: 'pass123'
        });

        try {
            await UserModel.create({
                username: 'Johnathan Doe',
                email: 'john.doe@mail.utoronto.ca',
                password: 'xyzabc123'
            });
        } catch (e) {
            expect(e).not.toBe(null);
        }

        const johns = await UserModel.find({ email: user.email });
        expect(johns.length).toBe(1);
    });
});
