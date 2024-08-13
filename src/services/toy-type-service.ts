import { Schema } from 'mongoose';
import ToyTypeModel from '../models/toy-type-model';
import ApiError from '../exceptions/api-error';
import {IToyType} from "../shared/interfaces/toy-type-interfaces";

class ToyTypeService {
    async create(toyTypeData: IToyType) {
        try {
            const toyType = new ToyTypeModel(toyTypeData);
            await toyType.save();
            return toyType;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        return await ToyTypeModel.find().populate('supplier_id personage_obj_state_id default_scenario_id');
    }

    async getById(id: string) {
        const toyType = await ToyTypeModel.findById(id).populate('supplier_id personage_obj_state_id default_scenario_id');
        if (!toyType) {
            throw ApiError.BadRequest(`ToyType with ID ${id} not found.`);
        }
        return toyType;
    }

    async update(id: string, updateData: IToyType) {
        const toyType = await ToyTypeModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!toyType) {
            throw ApiError.BadRequest(`ToyType with ID ${id} not found.`);
        }
        return toyType;
    }

    async delete(id: string) {
        const result = await ToyTypeModel.findByIdAndDelete(id);
        if (!result) {
            throw ApiError.BadRequest(`ToyType with ID ${id} not found.`);
        }
        return { message: `ToyType with ID ${id} successfully deleted.` };
    }

    async searchByPriceRange(minPrice: number, maxPrice: number) {
        return await ToyTypeModel.find({
            price: { $gte: minPrice, $lte: maxPrice }
        }).populate('supplier_id personage_obj_state_id default_scenario_id');
    }

    async findBySupplier(supplierId: Schema.Types.ObjectId) {
        return await ToyTypeModel.find({ supplier_id: supplierId })
            .populate('supplier_id personage_obj_state_id default_scenario_id');
    }
}

export default new ToyTypeService();
