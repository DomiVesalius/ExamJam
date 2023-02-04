import dotenv from 'dotenv';
dotenv.config(); // Always keep these lines at the top of this file

import express, { Express } from 'express';

import loggingMiddleware from './middlewares/logging.middleware';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware';

import { RegisterRoutes } from './routes/routes';
import apiRouter from './routes/apiRouter';

import SERVER_CONFIG from './config/server.config';

const app: Express = express();

// Parsing cookies
app.use(cookieParser(SERVER_CONFIG.cookieSecret));

// Logging requests
app.use(loggingMiddleware);

// Parsing requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Loading routes
RegisterRoutes(app);

app.use('/api', apiRouter);

// Error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
