import express from 'express';
import PassportStrategies from './passport.middleware';

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName == PassportStrategies.local) {
        if (request.isAuthenticated()) return Promise.resolve({ user: request.user });

        return Promise.reject({});
    }

    return Promise.reject({});
}
