import session from 'express-session';
import SERVER_CONFIG from '../config/server.config';
import app from '../app';

const sessionMiddleware = session({
    secret: SERVER_CONFIG.cookieSecret,
    resave: true,
    saveUninitialized: true
});

export default sessionMiddleware;
