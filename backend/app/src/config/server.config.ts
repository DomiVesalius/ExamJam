type ServerConfig = {
    port: number;
    host: string;
    url: string;
    cookieSecret: string;
    verifyEmailJwtSecret: string;
};

const host = process.env.SERVER_HOST || 'localhost';
const port = parseInt(process.env.SERVER_PORT || '8080');
const url = `${host}:${port}/api`;
const cookieSecret = process.env.COOKIE_SECRET || 'Secret';
const verifyEmailJwtSecret = process.env.VERIFY_EMAIL_JWT_SECRET || 'Verify Email Secret Key';

const SERVER_CONFIG: ServerConfig = {
    host,
    port,
    url,
    verifyEmailJwtSecret,
    cookieSecret
};

export default SERVER_CONFIG;
