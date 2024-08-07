import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../exeptions/api-error";

function roleMiddleware(roles: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(ApiError.UnauthorizedError());
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as jwt.JwtPayload;
            const userRole = decoded.role;

            if (!roles.includes(userRole)) {
                return next(ApiError.ForbiddenError());
            }

            return next();
        } catch (error) {
            return next(ApiError.UnauthorizedError());
        }
    };
}

export default roleMiddleware;
