import { BaseController } from '../base.controller';
import {
    Body,
    Post,
    Route,
    Tags,
    Middlewares,
    Security,
    Get,
    Request,
    Delete,
    Query,
    Patch
} from 'tsoa';
import {
    ChangeBioBody,
    ChangeBioResponse,
    ChangePasswordBody,
    ChangePasswordResponse,
    ChangeUsernameBody,
    ChangeUsernameResponse,
    DeleteUserResponse,
    LoginBody,
    LoginResponse,
    LogoutResponse,
    RegisterBody,
    RegisterResponse,
    validChangePasswordSchema,
    validChangeUsernameSchema,
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
import logger from '../../utils/logger.util';

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
        const user = req.user as string;

        let resBody: LoginResponse;
        if (req.isAuthenticated()) {
            resBody = { success: true, code: 200, data: { email: user } };
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
    public async logout(@Request() req: ExpressRequest): Promise<LogoutResponse> {
        req.logout(() => {});
        const resBody: LogoutResponse = { code: 200, success: true };
        this.setStatus(resBody.code);
        return resBody;
    }

    @Security(PassportStrategies.local)
    @Get('me')
    public async me(@Request() req: ExpressRequest): Promise<any> {
        const userEmail = req.user as string;
        const user = await UsersService.getByEmail(userEmail);

        if (!user) return {};

        return { email: userEmail, username: user.username, bio: user.bio };
    }

    @Security(PassportStrategies.local)
    @Middlewares<RequestHandler>(validationMiddleware(validChangePasswordSchema))
    @Patch('change-password')
    public async changePassword(
        @Request() req: ExpressRequest,
        @Body() body: ChangePasswordBody
    ): Promise<ChangePasswordResponse> {
        const userEmail = req.user as string;
        let resBody: ChangePasswordResponse;

        // Current password is incorrect
        if (!(await UsersService.comparePassword(userEmail, body.currentPassword))) {
            resBody = {
                code: 403,
                success: false,
                message: 'Incorrect password'
            };

            this.setStatus(resBody.code);
            return resBody;
        }

        // Current password is correct
        if (await UsersService.changePassword(userEmail, body.newPassword)) {
            resBody = {
                code: 200,
                success: true
            };
        } else {
            resBody = {
                code: 500,
                success: false
            };
        }

        this.setStatus(resBody.code);

        return resBody;
    }

    @Security(PassportStrategies.local)
    @Middlewares<RequestHandler>(validationMiddleware(validChangeUsernameSchema))
    @Patch('change-username')
    public async changeUsername(
        @Request() req: ExpressRequest,
        @Body() body: ChangeUsernameBody
    ): Promise<ChangeUsernameResponse> {
        const userEmail = req.user as string;
        const { newUsername } = body;

        let resBody: ChangeUsernameResponse;

        const changed = await UsersService.changeUsername(userEmail, newUsername);

        if (changed) {
            resBody = { code: 200, success: true };
        } else {
            resBody = { code: 404, success: false };
        }

        this.setStatus(resBody.code);

        return resBody;
    }

    @Security(PassportStrategies.local)
    @Patch('change-bio')
    public async changeBio(
        @Request() req: ExpressRequest,
        @Body() body: ChangeBioBody
    ): Promise<ChangeBioResponse> {
        const userEmail = req.user as string;
        const { bio } = body;

        const result = await UsersService.changeBio(userEmail, bio);

        let resBody: ChangeBioResponse;
        if (result) {
            resBody = { code: 200, success: true };
        } else {
            resBody = { code: 500, success: true };
        }

        this.setStatus(resBody.code);

        return resBody;
    }

    @Security(PassportStrategies.local)
    @Delete('')
    public async deleteUser(@Request() req: ExpressRequest): Promise<DeleteUserResponse> {
        const userEmail = req.user as string;

        const result = await UsersService.deleteUser(userEmail);

        const resBody: DeleteUserResponse = {
            code: result ? 200 : 500,
            success: result
        };

        // After a successful deletion, request must be logged out to avoid future requests
        // on a deleted users behalf.
        if (resBody.code === 200)
            req.logout(() => logger.info(`Deleted user '${userEmail}' and logging out`));

        this.setStatus(resBody.code);
        return resBody;
    }
}
