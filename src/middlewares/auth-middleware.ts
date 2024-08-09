import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import ApiError from "../exeptions/api-error";

interface IUser {
    id: string;
}

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (error: Error | null, user: IUser | false) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return next(ApiError.UnauthorizedError());
        }
        request.user = user;
        next();
    })(request, response, next);
};

export default authMiddleware;
