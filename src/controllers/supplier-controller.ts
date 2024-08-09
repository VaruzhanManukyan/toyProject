import {Request, Response, NextFunction} from "express";
import SupplierService from "../services/supplier-service";
import {ISupplier} from "../shared/interfaces/supplier-interfaces";

class SupplierController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const supplier: ISupplier = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone
            }

            const supplierSave = await SupplierService.create(supplier);
            response.status(201).json(supplierSave);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const suppliers: ISupplier[] = await SupplierService.getAll();
            response.status(200).json(suppliers);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const supplier = await SupplierService.getById(request.params.id);
            return response.status(200).json(supplier)
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const supplierUpdated: ISupplier = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone
            }

            const supplierSave = await SupplierService.update(request.params.id, supplierUpdated);
            response.status(200).json(supplierSave);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const message: string = await SupplierService.remove(request.params.id);
            response.status(200).json({message});
        } catch (error) {
            next(error);
        }
    }
}

export default new SupplierController();