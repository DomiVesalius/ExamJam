import { BaseController } from '../base.controller';
import { Body, Post, Route, Tags, Middlewares, Security, Get, Request, Delete, Query } from 'tsoa';
import {
    LoginBody,
    LoginResponse,
    RegisterBody,
    RegisterResponse,
    validRegisterSchema,
    VerifyEmailResponse
} from './users.schemas';

import validationMiddleware from '../../middlewares/validation.middleware';
import { RequestHandler, Request as ExpressRequest } from 'express';

import { UsersService } from '../../models/user/users.service';

import passport from 'passport';
import PassportStrategies from '../../middlewares/passport.middleware';
import { IUserModel } from '../../models/user/user.model';
import { EmailService } from '../../services/email.service';
import jwt from 'jsonwebtoken';
import SERVER_CONFIG from '../../config/server.config';

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

        await EmailService.sendVerificationEmail(user);

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
        const user = <IUserModel>req.user;

        let resBody: LoginResponse;
        if (req.isAuthenticated()) {
            resBody = { success: true, code: 200, data: { email: user.email } };
        } else {
            resBody = { success: false, code: 401, message: 'Invalid Credentials' };
        }

        this.setStatus(resBody.code);
        return resBody;
    }

    @Get('verify-email')
    public async verifyEmail(@Query() token: string): Promise<VerifyEmailResponse> {
        let resBody: VerifyEmailResponse;

        try {
            const payload = <{ data: string }>jwt.verify(token, SERVER_CONFIG.verifyEmailJwtSecret);
            const email = payload.data;

            const user: IUserModel | null = await UsersService.getByEmail(email);
            if (user) {
                resBody = { code: 200, success: true, message: 'Email verified' };
                await UsersService.activateUser(email);
            } else {
                resBody = { code: 404, success: false, errors: [`User with email '${email}'`] };
            }

            this.setStatus(resBody.code);
            return resBody;
        } catch (e) {
            resBody = { code: 403, success: false, errors: ['Invalid token'] };
            this.setStatus(resBody.code);
            return resBody;
        }
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
