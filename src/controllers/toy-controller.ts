import {Request, Response, NextFunction} from "express";
import ToyService from "../services/toy-service";
import {IToy} from "../shared/interfaces/toy-interfaces";
import ApiError from "../exceptions/api-error";

class ToyController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {toy_type_id, RFID} = request.body;

            if (!toy_type_id || !RFID) {
                return next(ApiError.BadRequest("Toy type ID and RFID are required"));
            }

            const toy: IToy = {toy_type_id, RFID};
            const createdToy = await ToyService.create(toy);
            response.status(201).json(createdToy);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const toys = await ToyService.getAll();
            response.status(200).json(toys);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const toy = await ToyService.getById(request.params.id);
            if (!toy) {
                return next(ApiError.NotFound("Toy not found"));
            }
            response.status(200).json(toy);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const {toy_type_id, RFID} = request.body;

            if (!toy_type_id && !RFID) {
                return next(ApiError.NotFound("At least one of toy_type_id or RFID is required"));
            }

            const toy: IToy = {toy_type_id, RFID};
            const updatedToy = await ToyService.update(request.params.id, toy);
            if (!updatedToy) {
                return next(ApiError.NotFound("Toy not found"));
            }
            response.status(200).json(updatedToy);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await ToyService.remove(request.params.id);
            if (result.deletedCount === 0) {
                return next(ApiError.NotFound("Toy not found"));
            }
            response.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new ToyController();
