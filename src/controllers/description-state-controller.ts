import {Request, Response, NextFunction} from "express";
import DescriptionStateService from "../services/description-state-service";
import {IDescriptionState} from "../shared/interfaces/description-state-interfaces";

class DescriptionStateController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const descriptionState: IDescriptionState = {
                name: request.body.name,
            }

            const descriptionStateSave = await DescriptionStateService.create(descriptionState);
            response.status(201).json(descriptionStateSave);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const descriptionStates: IDescriptionState[] = await DescriptionStateService.getAll();
            response.status(200).json(descriptionStates);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const descriptionState = await DescriptionStateService.getById(request.params.id);
            return response.status(200).json(descriptionState)
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const descriptionStateUpdated: IDescriptionState = {
                name: request.body.name,
            }

            const descriptionStateSave = await DescriptionStateService.update(request.params.id, descriptionStateUpdated);
            response.status(200).json(descriptionStateSave);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const message: string = await DescriptionStateService.remove(request.params.id);
            response.status(200).json({message});
        } catch (error) {
            next(error);
        }
    }

}

export default new DescriptionStateController();