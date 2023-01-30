import { Request, Response, RequestHandler } from 'express';

export const errorMiddleware: RequestHandler = (req: Request, res: Response) => {
    return res.status(500).json({ message: 'An unknown error has occurred' });
};

export const notFoundMiddleware: RequestHandler = (req: Request, res: Response) => {
    return res.status(404).json({ message: 'Resource not found' });
};
