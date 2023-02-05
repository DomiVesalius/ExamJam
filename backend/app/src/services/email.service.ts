import nodemailer, { SentMessageInfo, SendMailOptions } from 'nodemailer';
import jwt from 'jsonwebtoken';

import { IUserModel } from '../models/user/user.model';
import SERVER_CONFIG from '../config/server.config';
import logger from '../utils/logger.util';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NO_REPLY_EMAIL,
        pass: process.env.NO_REPLY_EMAIL_PWD
    }
});

export class EmailService {
    public static async sendVerificationEmail(user: IUserModel): Promise<Error | SentMessageInfo> {
        if (process.env.NODE_ENV === 'test') return;

        const token = jwt.sign({ data: user.email }, SERVER_CONFIG.verifyEmailJwtSecret, {
            expiresIn: '1h'
        });

        const mailOptions: SendMailOptions = {
            from: process.env.NO_REPLY_EMAIL,
            to: user.email,
            subject: 'Verify your ExamJam account',
            text:
                'Click the link below to verify your email and activate your account:' +
                `\nlocalhost/api/user/verify-email?token=${token}\nThe token will expire in 1 hour.`
        };

        try {
            const messageInfo = await transporter.sendMail(mailOptions);
            logger.info(`Verification email sent to ${user.email}`);
            return messageInfo;
        } catch (e) {
            logger.info(`Failed to send verification email to ${mailOptions.to}`, e);
            return null;
        }
    }
}
