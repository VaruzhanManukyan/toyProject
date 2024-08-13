import { IToy } from "../shared/interfaces/toy-interfaces";
import ToyModel from "../models/toy-model";

class ToyService {
    async create(toy: IToy) {
        const newToy = new ToyModel(toy);
        await newToy.save();
        return newToy;
    }

    async getAll() {
        return await ToyModel.find();
    }

    async getById(id: string) {
        return await ToyModel.findById(id);
    }

    async update(id: string, update: Partial<IToy>) {
        return await ToyModel.findByIdAndUpdate(id, { $set: update }, { new: true });
    }

    async remove(id: string) {
        return await ToyModel.deleteOne({ _id: id });
    }
}

export default new ToyService();
