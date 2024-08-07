import ToyTypeModel from "../models/toy-type-model";

class ToyTypeService {
    async create(supplier: any) {
        const supplierDB = new ToyTypeModel({
            name: supplier.name
        });
        await supplierDB.save();
        return supplierDB;
    }

    async getById(id: string) {
        return await ToyTypeModel.findById(id);
    }

    async update(update: string) {
        const supplier = await ToyTypeModel.findOneAndUpdate(
            {set: update},
            {new: true}
        );
        return supplier;
    }

    async remove(id: string) {
        await ToyTypeModel.deleteOne({_id: id});
        return "Category is delete";
    }
}

export default new ToyTypeService();