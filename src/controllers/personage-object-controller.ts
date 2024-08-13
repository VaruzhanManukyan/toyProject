import {Request, Response, NextFunction} from "express";
import PersonageObjectService from "../services/personage-object-service";
import {IPersonageObject} from "../shared/interfaces/personage-object-interfaces";

class PersonageObjectController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObject: IPersonageObject = {
                name: request.body.name,
            }

            const personageObjectSave = await PersonageObjectService.create(personageObject);
            response.status(201).json(personageObjectSave);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObjects: IPersonageObject[] = await PersonageObjectService.getAll();
            response.status(200).json(personageObjects);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObject = await PersonageObjectService.getById(request.params.id);
            return response.status(200).json(personageObject)
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObjectUpdated: IPersonageObject = {
                name: request.body.name,
            }

            const personageObjectSave = await PersonageObjectService.update(request.params.id, personageObjectUpdated);
            response.status(200).json(personageObjectSave);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const message: string = await PersonageObjectService.remove(request.params.id);
            response.status(200).json({message});
        } catch (error) {
            next(error);
        }
    }

}

export default new PersonageObjectController();