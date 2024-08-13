import {Request, Response, NextFunction} from "express";
import ScenarioService from "../services/scenario-service";
import {Types} from "mongoose";

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
            const scenarios = await ScenarioService.getAll();
            response.status(200).json(scenarios);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const scenario = await ScenarioService.getById(request.params.id);
            return response.status(200).json(scenario);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const {name} = request.body;
            const audioFiles = request.files as Express.Multer.File[];
            const scenario = await ScenarioService.update(request.params.id, name, audioFiles);
            response.status(200).json(scenario);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const message: string = await ScenarioService.remove(request.params.id);
            response.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    async getMediaFileIds(request: Request, response: Response, next: NextFunction) {
        try {
            const {RFID} = request.body;
            const audio_file_ids: Types.ObjectId[] = await ScenarioService.getMediaFileIds(RFID);
            response.status(200).json(audio_file_ids);
        } catch (error) {
            next(error);
        }
    }
}

export default new ScenarioController();