import {Request, Response, NextFunction} from "express";
import PersonageObjectStateService from "../services/personage-object-state-service";
import {IPersonageObjectState} from "../shared/interfaces/personage-object-state-interfaes";

class PersonageObjectStateController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObjectState: IPersonageObjectState = {
                personage_obj_id: request.body.personage_obj_id,
                description_state_ids: request.body.description_state_ids
            }

            const personageObjectSave = await PersonageObjectStateService.create(personageObjectState);
            response.status(201).json(personageObjectSave);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObjects: IPersonageObjectState[] = await PersonageObjectStateService.getAll();
            response.status(200).json(personageObjects);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObject = await PersonageObjectStateService.getById(request.params.id);
            return response.status(200).json(personageObject)
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const personageObjectStateUpdate: IPersonageObjectState = {
                personage_obj_id: request.body.personage_obj_id,
                description_state_ids: request.body.description_state_ids
            }

            const personageObjectSave = await PersonageObjectStateService.update(request.params.id, personageObjectStateUpdate);
            response.status(200).json(personageObjectSave);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const message: string = await PersonageObjectStateService.remove(request.params.id);
            response.status(200).json({message});
        } catch (error) {
            next(error);
        }
    }

}

export default new PersonageObjectStateController();