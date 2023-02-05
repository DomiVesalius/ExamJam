import { BaseController } from '../base.controller';
import { Body, Post, Route, Tags, Middlewares, Security, Get, Request, Delete } from 'tsoa';
import {
    LoginBody,
    LoginResponse,
    RegisterBody,
    RegisterResponse,
    validRegisterSchema
} from './users.schemas';

import validationMiddleware from '../../middlewares/validation.middleware';
import { RequestHandler, Request as ExpressRequest } from 'express';

import { UsersService } from '../../models/user/users.service';

import passport from 'passport';
import PassportStrategies from '../../middlewares/passport.middleware';
import { IUserModel } from '../../models/user/user.model';

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

    @Middlewares(passport.authenticate(PassportStrategies.local))
    @Post('login')
    public async login(
        @Request() req: ExpressRequest,
        @Body() body: LoginBody
    ): Promise<LoginResponse> {
        let resBody: LoginResponse;
        if (req.isAuthenticated()) {
            const user = <IUserModel>req.user;
            resBody = { success: true, code: 200, data: { email: user.email } };
        } else {
            resBody = { success: false, code: 401, message: 'Invalid Credentials' };
        }

        this.setStatus(resBody.code);
        return resBody;
    }

    @Security(PassportStrategies.local)
    @Delete('logout')
    public async logout(@Request() req: ExpressRequest): Promise<void> {
        req.logout((err: any) => {
            if (err) {
                this.setStatus(401);
            }
        });
    }

    @Security(PassportStrategies.local)
    @Get('me')
    public async me(@Request() req: ExpressRequest): Promise<any> {
        return { user: req.user };
    }
}
