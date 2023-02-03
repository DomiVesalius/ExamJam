import dotenv from 'dotenv';
dotenv.config(); // Always keep these lines at the top of this file

import express, { Express } from 'express';

import loggingMiddleware from './middlewares/logging.middleware';
import bodyParser from 'body-parser';
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware';

import { RegisterRoutes } from './routes/routes';
import apiRouter from './routes/apiRouter';

const app: Express = express();

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
