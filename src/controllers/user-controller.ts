import {Request, Response, NextFunction} from "express";
import userService from "../services/user-service";

class UserController {
    async registration(request: Request, response: Response, next: NextFunction) {
        try{
            const {email, password} = request.body;
            const userData = await userService.registration(email, password);
            response.status(201).json(userData);
        } catch(error) {
            next(error);
        }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        try{
            const {email, password} = request.body;
            const userData = await userService.login(email, password);
            response.setHeader("Authorization", `Bearer ${userData.token}`);
            response.status(200).json(userData);
        } catch(error) {
            next(error);
        }
    }
}

export default new UserController();