import DeviceModel from '../models/device-model';
import ApiError from '../exceptions/api-error';
import {IDevice} from "../shared/interfaces/device-interfaces";
import UserModeL from "../models/user-model";
import {Types} from "mongoose";

class DeviceService {
    async create(supplier_id: string, serial_number: string) {
        const device = new DeviceModel({ supplier_id, serial_number });
        await device.save();
        return device;
    }

    async getAll() {
        return DeviceModel.find();
    }

    async getById(id: string) {
        const device = await DeviceModel.findById(id);
        if (!device) {
            throw ApiError.BadRequest(`Device with id ${id} not found.`);
        }
        return device;
    }

    async update(id: string, updateData: Partial<IDevice>) {
        const device = await DeviceModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!device) {
            throw ApiError.BadRequest(`Device with id ${id} not found.`);
        }
        return device;
    }

    async remove(id: string) {
        const device = await DeviceModel.findByIdAndDelete(id);
        if (!device) {
            throw ApiError.BadRequest(`Device with id ${id} not found.`);
        }
        return 'Device has been deleted.'
    }

    async connect(id: string, userId: string) {
        if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
            throw ApiError.BadRequest(`Invalid id(s) ${id}, ${userId}.`);
        }

        const device = await DeviceModel.findById(id);
        if (!device) {
            throw ApiError.BadRequest(`Device with id ${id} not found.`);
        }

        const user = await UserModeL.findById(userId);
        if (!user) {
            throw ApiError.BadRequest(`User with id ${userId} not found.`);
        }

        const deviceObjectId = new Types.ObjectId(id);
        if (!user.device_ids.includes(deviceObjectId)) {
            user.device_ids.push(deviceObjectId);
            await user.save();
        }
        return device;
    }
}

export default new DeviceService();
