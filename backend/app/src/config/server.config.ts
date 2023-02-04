type ServerConfig = {
    port: number;
    host: string;
    url: string;
    cookieSecret: string;
};

const host = process.env.SERVER_HOST || 'localhost';
const port = parseInt(process.env.SERVER_PORT || '8080');
const url = `${host}:${port}/api`;
const cookieSecret = process.env.COOKIE_SECRET || 'Secret';

const SERVER_CONFIG: ServerConfig = {
    host,
    port,
    url,
    cookieSecret
};

export default SERVER_CONFIG;
