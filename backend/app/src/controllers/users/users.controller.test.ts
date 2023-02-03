import { TestUtil } from '../../utils/test.util';
import request from 'supertest';
import app from '../../app';
import { RegisterBody } from './users.schemas';

enum UsersEndpoints {
    register = '/api/users/register'
}

describe(`[POST ${UsersEndpoints.register}]`, () => {
    beforeAll(async () => {
        await TestUtil.connectToTestDatabase();
    });

    afterEach(async () => {
        await TestUtil.removeAllDocuments();
    });

    afterAll(async () => {
        await TestUtil.disconnectFromTestDatabase();
    });

    test('Cannot register the same email twice', async () => {
        const email = 'example.email@mail.utoronto.ca';
        const firstBody: RegisterBody = {
            email,
            username: 'RandomUsername1',
            password: 'abcd12345``',
            confirmPassword: 'abcd12345``'
        };
        const secondBody: RegisterBody = {
            email,
            username: 'RandomUsername2',
            password: '12345abcd``',
            confirmPassword: '12345abcd``'
        };

        // This should succeed
        let res: request.Response;

        res = await request(app).post(UsersEndpoints.register).send(firstBody);
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);

        // This should fail because a user with the same email is already registered
        res = await request(app).post(UsersEndpoints.register).send(secondBody);
        expect(res.status).toBe(409);
        expect(res.body.success).toBe(false);
    });

    test('Cannot register with missing fields', async () => {
        const exampleBody = {
            email: 'rock.lee@mail.utoronto.ca',
            username: 'RandomUsername1',
            password: 'abcd12345``',
            confirmPassword: 'abcd12345``'
        };

        for (const key of Object.keys(exampleBody)) {
            let clone = JSON.parse(JSON.stringify(exampleBody)); // Deep copy
            delete clone[key];

            let res: request.Response = await request(app)
                .post(UsersEndpoints.register)
                .send(clone);

            expect(res.status).toBe(400);
        }
    });

    test('Passwords are too short', async () => {
        const body: RegisterBody = {
            email: 'soos.ramirez@mail.utoronto.ca',
            username: 'Soos',
            password: '123',
            confirmPassword: '123'
        };

        const res: request.Response = await request(app).post(UsersEndpoints.register).send(body);
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test('Passwords do not match', async () => {
        const body: RegisterBody = {
            email: 'stanford.pines@mail.utoronto.ca',
            username: 'Stanford Pines',
            password: 'gullible',
            confirmPassword: 'gulloble'
        };

        const res: request.Response = await request(app).post(UsersEndpoints.register).send(body);
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test('One or more body fields are empty', async () => {
        const exampleBody = {
            email: 'empty.fields@mail.utoronto.ca',
            username: 'EmptyFIELDS',
            password: 'EMPTEMPTYEMPTY',
            confirmPassword: 'EMPTEMPTYEMPTY'
        };

        for (const key of Object.keys(exampleBody)) {
            let clone = JSON.parse(JSON.stringify(exampleBody)); // Deep copy
            clone[key] = '';

            let res: request.Response = await request(app)
                .post(UsersEndpoints.register)
                .send(clone);

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        }
    });

    test('Email does not match UofT email regex', async () => {
        const nonUofTStudent: RegisterBody = {
            email: 'billciph3@uwaterloo.ca',
            username: 'B1ll Ciph3r',
            password: 'ipssjfwoly',
            confirmPassword: 'ipssjfwoly'
        };

        const res: request.Response = await request(app)
            .post(UsersEndpoints.register)
            .send(nonUofTStudent);
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test('Successful registrations', async () => {
        const uTorontoStudent: RegisterBody = {
            email: 'robert.herjavec@utoronto.ca',
            username: 'Robert Herjavec',
            password: 'fdslnhksdjk',
            confirmPassword: 'fdslnhksdjk'
        };

        const uTorontoProfessor: RegisterBody = {
            email: 'daniel.zingaro@utoronto.ca',
            username: 'Dan',
            password: 'dAHJFAJjgfd',
            confirmPassword: 'dAHJFAJjgfd'
        };

        const users: Array<RegisterBody> = [uTorontoProfessor, uTorontoStudent];

        let res: request.Response;
        for (const user of users) {
            res = await request(app).post(UsersEndpoints.register).send(user);
            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
        }
    });
});
