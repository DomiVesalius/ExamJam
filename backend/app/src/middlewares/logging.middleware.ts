import { Request, Response, NextFunction, RequestHandler } from 'express';
import logger from '../utils/logger.util';
import os from 'os';

/**
 * Logs metadata of the initial http request and the eventual response.
 */
const loggingMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    logger.info(getLogString(req)); // logging info when request is initially received

    // setting an event handler for when the response is sent back
    res.on('finish', () => {
        logger.info(getLogString(req, res));
    });

    next();
};

/**
 * Creates a string containing metadata of either the request or response.
 * If there is no response object, request metadata will be used.
 */
function getLogString(req: Request, res?: Response): string {
    if (!res) {
        return `METHOD - [${req.method}], URL - [${req.url}], IP - [${
            req.socket.remoteAddress
        }], HOST [${os.hostname()}]`;
    }

    return `METHOD - [${req.method}], URL - [${req.url}], IP - [${
        req.socket.remoteAddress
    }], STATUS - [${res.statusCode}], HOST [${os.hostname()}]`;
}

export default loggingMiddleware;
