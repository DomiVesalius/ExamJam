import { Request } from 'express';

/**
 * Gets the currently authenticated user for the given request. This assumes that a user has
 * already been authenticated and should only be used by controllers with the @Security() decorator
 * @param req the request object
 */
export const getUserFromRequest = (req: Request) => {
    return req.user as string;
};
