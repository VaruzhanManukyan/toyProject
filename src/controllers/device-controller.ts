import { Request, Response, NextFunction } from 'express';
import DeviceService from '../services/device-service';
import {IDevice} from "../shared/interfaces/device-interfaces";

class DeviceController {
    async create(request: Request, res: Response, next: NextFunction) {
        try {
            const { serial_number } = request.body;
            const device = await DeviceService.create(request.params.supplierId, serial_number);
            res.status(201).json(device);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, res: Response, next: NextFunction) {
        try {
            const devices = await DeviceService.getAll();
            res.status(200).json(devices);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, res: Response, next: NextFunction) {
        try {
            const device = await DeviceService.getById(request.params.id);
            res.status(200).json(device);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, res: Response, next: NextFunction) {
        try {
            const updateData = request.body;
            const device = await DeviceService.update(request.params.id, updateData);
            res.status(200).json(device);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, res: Response, next: NextFunction) {
        try {
            const message: string = await DeviceService.remove(request.params.id);
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }

    async connect(request: Request, res: Response, next: NextFunction) {
        try {
            const device = await DeviceService.connect(request.params.id, request.params.userId);
            res.status(200).json( device);
        } catch (error) {
            next(error);
        }
    }
}

export default new DeviceController();
