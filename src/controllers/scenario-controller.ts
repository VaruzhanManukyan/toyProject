import {Request, Response, NextFunction} from "express";
import ScenarioService from "../services/scenario-service";

class ScenarioController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {name} = request.body;
            const publisherId: string = request.params.publisherId;
            const audioFiles = request.files as Express.Multer.File[];
            const scenario = await ScenarioService.create(name, audioFiles, publisherId);
            response.status(201).json(scenario);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            response.status(200).json({});
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            return response.status(200).json({})
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            response.status(200).json({});
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            response.status(200).json({});
        } catch (error) {
            next(error);
        }
    }
}

export default new ScenarioController();