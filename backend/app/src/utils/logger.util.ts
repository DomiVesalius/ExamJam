import winston, { format, transports, createLogger, Logger } from 'winston';

// Source: https://github.com/winstonjs/winston

const logFormat: winston.Logform.Format = format.printf(
    (info: winston.Logform.TransformableInfo) => {
        const { level, message, timestamp, stack, mainLabel, childLabel } = info;

        if (typeof message === 'object') {
            return `${timestamp} [${childLabel || mainLabel}] [${level.toUpperCase()}]: ${
                stack || JSON.stringify(message, null, 2)
            }`;
        } else {
            return `${timestamp} [${childLabel || mainLabel}] [${level.toUpperCase()}]: ${
                stack || message
            }`;
        }
    }
);

const loggerOptions = {
    defaultMeta: {
        mainLabel: 'Server'
    },
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        logFormat,
        format.colorize()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
};

const logger: Logger = createLogger(loggerOptions);

export default logger;
