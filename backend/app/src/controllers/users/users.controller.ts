import { BaseController } from '../base.controller';
import { Body, Post, Route, Tags, Middlewares } from 'tsoa';
import { RegisterBody, RegisterResponse, validRegisterSchema } from './users.schemas';
import validationMiddleware from '../../middlewares/validation.middleware';
import { RequestHandler } from 'express';
import { UsersService } from '../../models/user/users.service';

@Tags('Users')
@Route(`users`)
export class UsersController extends BaseController {
    @Middlewares<RequestHandler>(validationMiddleware(validRegisterSchema))
    @Post('register')
    public async register(@Body() body: RegisterBody): Promise<RegisterResponse> {
        const userExists = await UsersService.getByEmail(body.email);

        if (userExists) {
            const res: RegisterResponse = {
                success: false,
                code: 409,
                errors: ['Email already in use']
            };
            this.setStatus(res.code);
            return res;
        }

        // The following will likely only fail if the email does not match the UofT email regex
        const user = await UsersService.createUser(body.email, body.username, body.password);

        if (!user) {
            const res: RegisterResponse = {
                success: false,
                code: 400,
                errors: ['Email is not a UofT email address']
            };
            this.setStatus(res.code);
            return res;
        }

        const res: RegisterResponse = { code: 201, success: true, message: 'Registered' };
        this.setStatus(res.code);

        return res;
    }
}
