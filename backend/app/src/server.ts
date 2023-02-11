import app from './app';
import SERVER_CONFIG from './config/server.config';
import logger from './utils/logger.util';
import DB_CONFIG from './config/db.config';

app.listen(SERVER_CONFIG.port, () => {
    logger.info(`Listening @ ${SERVER_CONFIG.url}`);
    logger.info(`API Docs @ ${SERVER_CONFIG.url}/docs`);

    DB_CONFIG.initializeConnection();
}).on('error', (err) => {
    logger.error(`Failed to start server: `, err);
});
