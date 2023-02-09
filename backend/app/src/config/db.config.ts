import * as mongoose from 'mongoose';
import logger from '../utils/logger.util';

type DBConfig = {
    port: number;
    host: string;
    name: string;
    url: string;
    options: object;
    initializeConnection: Function;
};

const port = parseInt(process.env.MONGO_PORT || '27017');
const host = process.env.MONGO_HOST || 'database';
const name = process.env.MONGO_NAME || 'ExamJam';
const url = process.env.MONGO_URL || `mongodb://${host}:${port}/${name}`;

function initializeConnection(): void {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') return;

    mongoose.set('strictQuery', false); // gets rid of a warning

    mongoose
        .connect(DB_CONFIG.url, DB_CONFIG.options)
        .then(() => {
            logger.info(`Connected to database @ ${DB_CONFIG.url}`);
        })
        .catch((e) => {
            logger.error(`Could not connect to database: `, e);
        });
}

const DB_CONFIG: DBConfig = {
    port,
    host,
    name,
    url,
    initializeConnection,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 10000,
        keepAlive: true,
        autoIndex: true,
        retryWrites: false
    }
};

export default DB_CONFIG;
