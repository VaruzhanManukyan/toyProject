import argon2 from "argon2";
import ApiError from "../exeptions/api-error";
import PublisherModel from "../models/publisher-model";
import {IPublisher} from "../shared/interfaces/publisher-interfaces";

class PublisherService {
    async create(publisher: IPublisher) {
        const {name, email, phone} = publisher;

        const candidateWithName = await PublisherModel.findOne({name});
        if (candidateWithName) {
            throw ApiError.BadRequest(`A publisher with this name ${name} already exists.`);
        }

        const candidateWithEmail = await PublisherModel.findOne({email});
        if (candidateWithEmail) {
            throw ApiError.BadRequest(`A publisher with this email address ${email} already exists`);
        }

        const candidateWithPhone = await PublisherModel.findOne({phone});
        if (candidateWithPhone) {
            throw ApiError.BadRequest(`A publisher with the same phone number ${phone} already exists.`);
        }

        const hashPassword: string = await argon2.hash(publisher.password);
        const publisherDB = new PublisherModel({
            scenario_ids: [],
            name: publisher.name,
            email: publisher.email,
            password: hashPassword,
            phone: publisher.phone
        });

        await publisherDB.save();
        return publisherDB;
    }

    async getAll() {
        const publishers: IPublisher[] = await PublisherModel.find();
        if (!publishers) {
            throw ApiError.BadRequest(`Publishers not found.`);
        }
        return publishers;
    }

    async getById(id: string) {
        const publisher = await PublisherModel.findById(id);
        if (!publisher) {
            throw ApiError.BadRequest(`Publisher with id ${id} not found.`);
        }
        return publisher;
    }

    async update(id: string, update: IPublisher) {
        const publisher = await PublisherModel.findOneAndUpdate(
            {_id: id},
            {set: update},
            {new: true}
        );
        if (!publisher) {
            throw ApiError.BadRequest(`Publishers not found.`);
        }
        return publisher;
    }

    async remove(id: string) {
        const publisher = await PublisherModel.deleteOne({_id: id});
        if (!publisher) {
            throw ApiError.BadRequest(`Publisher with id ${id} not found.`);
        }
        return "Publisher is delete";
    }
}

export default new PublisherService();