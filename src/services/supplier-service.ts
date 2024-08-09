import argon2 from "argon2";
import {ISupplier} from "../shared/interfaces/supplier-interfaces";
import SupplierModel from "../models/supplier-model";
import ApiError from "../exeptions/api-error";

class SupplierService {
    async create(supplier: ISupplier) {
        const {name, email, phone} = supplier;

        const candidateWithName = await SupplierModel.findOne({name});
        if (candidateWithName) {
            throw ApiError.BadRequest(`A supplier with this name ${name} already exists.`);
        }

        const candidateWithEmail = await SupplierModel.findOne({email});
        if (candidateWithEmail) {
            throw ApiError.BadRequest(`A supplier with this email address ${email} already exists`);
        }

        const candidateWithPhone = await SupplierModel.findOne({phone});
        if (candidateWithPhone) {
            throw ApiError.BadRequest(`A supplier with the same phone number ${phone} already exists.`);
        }

        const hashPassword: string = await argon2.hash(supplier.password);
        const supplierDB = new SupplierModel({
            name: supplier.name,
            email: supplier.email,
            password: hashPassword,
            phone: supplier.phone
        });

        await supplierDB.save();
        return supplierDB;
    }

    async getAll() {
        const suppliers: ISupplier[] = await SupplierModel.find();
        return suppliers;
    }

    async getById(id: string) {
        return await SupplierModel.findById(id);
    }

    async update(id: string, update: ISupplier) {
        const supplier = await SupplierModel.findOneAndUpdate(
            {_id: id},
            {set: update},
            {new: true}
        );
        return supplier;
    }

    async remove(id: string) {
        await SupplierModel.deleteOne({_id: id});
        return "Supplier is delete";
    }
}

export default new SupplierService();