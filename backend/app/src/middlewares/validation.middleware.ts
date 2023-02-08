import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../controllers/base.controller';

const validationMiddleware =
    (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        try {
            await schema.validate(body, { abortEarly: true });
            next();
        } catch (error) {
            const body: BaseResponse = {
                success: false,
                code: 400,
                errors: error
            };
            return res.status(body.code).json(body);
        }
    };

export default validationMiddleware;
