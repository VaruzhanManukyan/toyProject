import {Request, Response, NextFunction} from "express";
import SupplierService from "../services/supplier-service";
import {ISupplier} from "../shared/interfaces/supplier-interfaces";

class ToyTypeController {
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
            const supplierS: ISupplier[] = await SupplierService.getAll();
            return response.status(200).json(supplierS)
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
            const supplierupdated: ISupplier = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                phone: request.body.phone
            }

            const supplierSave = await SupplierService.update(request.params.id, supplierupdated);
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

export default new ToyTypeController();