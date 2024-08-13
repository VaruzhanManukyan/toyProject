import mongoose, {Schema} from "mongoose";
import { Request, Response, NextFunction } from 'express';
import ToyTypeService from '../services/toy-type-service';
import {IToyType} from "../shared/interfaces/toy-type-interfaces";

class ToyTypeController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { supplier_id, personage_obj_state_id, default_scenario_id, price, description, imageSrc } = request.body;

            if (!mongoose.Types.ObjectId.isValid(supplier_id) ||
                !mongoose.Types.ObjectId.isValid(personage_obj_state_id) ||
                !mongoose.Types.ObjectId.isValid(default_scenario_id)) {
                return response.status(400).json({ message: 'Invalid ObjectId provided.' });
            }
            const toyTypeData = {
                supplier_id: request.body.supplier_id,
                personage_obj_state_id: request.body.personage_obj_state_id,
                default_scenario_id: request.body.default_scenario_id,
                price: request.body.price,
                description: request.body.description,
                imageSrc: request.body.imageSrc
            };
            const toyType = await ToyTypeService.create(toyTypeData as IToyType);
            response.status(201).json(toyType);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const toyTypes = await ToyTypeService.getAll();
            response.status(200).json(toyTypes);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const toyType = await ToyTypeService.getById(request.params.id);
            response.status(200).json(toyType);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const updateData = {
                supplier_id: request.body.supplier_id,
                personage_obj_state_id: request.body.personage_obj_state_id,
                default_scenario_id: request.body.default_scenario_id,
                price: request.body.price,
                description: request.body.description,
                imageSrc: request.body.imageSrc
            };
            const updatedToyType = await ToyTypeService.update(request.params.id, updateData as IToyType);
            response.status(200).json(updatedToyType);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await ToyTypeService.delete(request.params.id);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async searchByPriceRange(request: Request, response: Response, next: NextFunction) {
        try {
            const { minPrice, maxPrice } = request.query;
            if (!minPrice || !maxPrice) {
                return response.status(400).json({ message: 'Min price and max price are required.' });
            }
            const toyTypes = await ToyTypeService.searchByPriceRange(Number(minPrice), Number(maxPrice));
            response.status(200).json(toyTypes);
        } catch (error) {
            next(error);
        }
    }

    async findBySupplier(request: Request, response: Response, next: NextFunction) {
        try {
            const supplierId = new Schema.Types.ObjectId(request.params.supplierId);
            const toyTypes = await ToyTypeService.findBySupplier(supplierId);
            response.status(200).json(toyTypes);
        } catch (error) {
            next(error);
        }
    }
}

export default new ToyTypeController();
