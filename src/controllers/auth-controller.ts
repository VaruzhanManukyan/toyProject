import {Request, Response, NextFunction} from "express";
import userService from "../services/auth-service";
import {Roles} from "../shared/enums/role-enum";
import ApiError from "../exeptions/api-error";

class AuthController {
    async registration(request: Request, response: Response, next: NextFunction) {
        try {
            const {email, password, role} = request.body;

            if (role === Roles.SUPER_ADMIN || !Object.values(Roles).includes(role)) {
                return next(ApiError.BadRequest(`User with role ${role} cannot be created`));
            }

            const userData = await userService.registration(email, password, role);
            response.status(201).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const {email, password} = request.body;
            const userData = await userService.login(email, password);
            response.setHeader("Authorization", `Bearer ${userData.token}`);
            response.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();