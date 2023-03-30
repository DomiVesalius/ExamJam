import { NextFunction, Request, Response } from 'express';

const MIN_PAGE = 1;
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

const paginationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page as unknown as number;
    const limit = req.query.limit as unknown as number;

    if (page < MIN_PAGE || limit < MIN_LIMIT) {
        return res.status(400).json({
            success: false,
            code: 400,
            page,
            limit,
            totalPages: -1,
            errors: ['page or limit query parameters are invalid'],
            data: []
        });
    }

    next();
};

export default paginationMiddleware;
