import { TestUtil } from '../../utils/test.util';
import request from 'supertest';
import app from '../../app';
import { RegisterBody } from './users.schemas';
import UserModel from '../../models/user/user.model';

enum UsersEndpoints {
    register = '/api/users/register',
    login = '/api/users/login',
    logout = '/api/users/logout',
    verifyEmail = '/api/users/verify-email'
}

describe(`[POST ${UsersEndpoints.register}]: `, () => {
    beforeAll(async () => {
        await TestUtil.connectToTestDatabase();
    });

    afterEach(async () => {
        await TestUtil.removeAllDocuments();
    });

    afterAll(async () => {
        await TestUtil.disconnectFromTestDatabase();
    });

    test(`[POST ${UsersEndpoints.register}]: Cannot register the same email twice`, async () => {
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

    test(`[POST ${UsersEndpoints.register}]: Cannot register with missing fields`, async () => {
        const exampleBody = {
            email: 'example.email@mail.utoronto.ca',
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

    test(`[POST ${UsersEndpoints.register}]: Passwords are too short`, async () => {
        const body: RegisterBody = {
            email: 'example.email@mail.utoronto.ca',
            username: 'Soos',
            password: '123',
            confirmPassword: '123'
        };

        const res: request.Response = await request(app).post(UsersEndpoints.register).send(body);
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test(`[POST ${UsersEndpoints.register}]: Passwords do not match`, async () => {
        const body: RegisterBody = {
            email: 'example.email@mail.utoronto.ca',
            username: 'Stanford Pines',
            password: 'gullible',
            confirmPassword: 'gulloble'
        };

        const res: request.Response = await request(app).post(UsersEndpoints.register).send(body);
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test(`[POST ${UsersEndpoints.register}]: One or more body fields are empty`, async () => {
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

    test(`[POST ${UsersEndpoints.register}]: Email does not match UofT email regex`, async () => {
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

    test(`[POST ${UsersEndpoints.register}]: Successful registrations`, async () => {
        const uTorontoStudent: RegisterBody = {
            email: 'example.email1@utoronto.ca',
            username: 'Robert Herjavec',
            password: 'fdslnhksdjk',
            confirmPassword: 'fdslnhksdjk'
        };

        const uTorontoProfessor: RegisterBody = {
            email: 'example.email2@utoronto.ca',
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

    /**
     * Successful attempt cannot be tested because it requires an actual token
     * which is only accessible through your email inbox
     */
    test(`[GET ${UsersEndpoints.verifyEmail}]: Verification token is invalid`, async () => {
        const res: request.Response = await request(app)
            .get(`${UsersEndpoints.verifyEmail}?token=fake-token`)
            .send();
        expect(res.status).toBe(403);
        expect(res.body.success).toBe(false);
    });

    test(`[POST ${UsersEndpoints.login}]: Invalid email`, async () => {
        const res: request.Response = await request(app)
            .post(UsersEndpoints.login)
            .send({ email: 'example.email@mail.utoronto.ca', password: 'password1234' });

        expect(res.status).toBe(401);
    });

    test(`[POST ${UsersEndpoints.login}]: Invalid password`, async () => {
        const res: request.Response = await request(app)
            .post(UsersEndpoints.login)
            .send({ email: 'example.email@mail.utoronto.ca', password: '1234password' });

        expect(res.status).toBe(401);
    });

    test(`[POST ${UsersEndpoints.login}]: Successful login`, async () => {
        // Example model to log into
        await UserModel.create({
            email: 'example.email@mail.utoronto.ca',
            username: 'Lee',
            active: true,
            password: 'password1234'
        });

        const res: request.Response = await request(app)
            .post(UsersEndpoints.login)
            .send({ email: 'example.email@mail.utoronto.ca', password: 'password1234' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test(`[DELETE ${UsersEndpoints.logout}]: Successful logout`, async () => {
        // Example model to log into
        await UserModel.create({
            email: 'example.email@mail.utoronto.ca',
            username: 'Lee',
            active: true,
            password: 'password1234'
        });

        const agent = request.agent(app);

        let res: request.Response;
        res = await agent
            .post(UsersEndpoints.login)
            .send({ email: 'example.email@mail.utoronto.ca', password: 'password1234' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);

        res = await agent.delete(UsersEndpoints.logout).send();

        expect(res.status).toBe(200);
    });

    test(`[DELETE ${UsersEndpoints.logout}]: Unsuccessful logout`, async () => {
        // Logging out without being logged in
        const res: request.Response = await request(app).delete(UsersEndpoints.logout).send();
        expect(res.status).toBe(401);
    });
});
