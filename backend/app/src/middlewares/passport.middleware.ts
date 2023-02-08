import passport from 'passport';
import PassportLocal, { IVerifyOptions } from 'passport-local';

import { UsersService } from '../models/user/users.service';
import { IUserModel } from '../models/user/user.model';

type DoneFunction = (error: any, user?: Express.User | false, options?: IVerifyOptions) => void;

passport.use(
    new PassportLocal.Strategy(
        { usernameField: 'email' },
        async (email: string, password: string, done: DoneFunction) => {
            try {
                if (await UsersService.comparePassword(email, password)) {
                    // At this point, a user exists because comparePassword returned true
                    const user: IUserModel = <IUserModel>await UsersService.getByEmail(email);

                    // Only check if the user account is activated in non-development environment
                    // to make it easier to for manual testing. Check will occur in 'production' and
                    // 'test' environments
                    if (process.env.NODE_ENV !== 'development' && !user.active) {
                        done(null, false);
                    } else {
                        done(null, user);
                    }
                } else {
                    // Since no user was found & there was no error, pass user as false to show
                    // unsuccessful auth (invalid credentials)
                    done(null, false);
                }
            } catch (e) {
                done(e);
            }
        }
    )
);

passport.serializeUser((user: Express.User, done: DoneFunction) => done(null, user));

passport.deserializeUser((user: Express.User, done) => done(null, user));

enum PassportStrategies {
    local = 'local'
}

export default PassportStrategies;
