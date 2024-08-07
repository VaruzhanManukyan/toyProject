import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-model";
import ApiError from "../exeptions/api-error";

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(ApiError.UnauthorizedError());
    }

    const token: string = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as jwt.JwtPayload;

        const userId = decoded.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return next(ApiError.UnauthorizedError());
        }
        return next();
    } catch (error) {
        next(ApiError.UnauthorizedError());
    }
}

export default authMiddleware;
