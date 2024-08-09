import {Request, Response, NextFunction} from "express";
import PublisherService from "../services/publisher-service";
import {IPublisher} from "../shared/interfaces/publisher-interfaces";

class PublisherController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const publisher: IPublisher = {
                scenario_ids: [],
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone
            }

            const publisherSave = await PublisherService.create(publisher);
            response.status(201).json(publisherSave);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const publisher: IPublisher[] = await PublisherService.getAll();
            response.status(200).json(publisher);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const publisher = await PublisherService.getById(request.params.id);
            return response.status(200).json(publisher)
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const publisherUpdated: IPublisher = {
                scenario_ids: [],
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone
            }

            const publisherSave = await PublisherService.update(request.params.id, publisherUpdated);
            response.status(200).json(publisherSave);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const message: string = await PublisherService.remove(request.params.id);
            response.status(200).json({message});
        } catch (error) {
            next(error);
        }
    }
}

export default new PublisherController();