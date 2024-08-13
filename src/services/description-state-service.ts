import {IDescriptionState} from "../shared/interfaces/description-state-interfaces";
import DescriptionStateModel from "../models/description-state-model";

class DescriptionStateService {
    async create(descriptionState: IDescriptionState) {
        const {name} = descriptionState;

        const descriptionStateDB = new DescriptionStateModel({name});

        await descriptionStateDB.save();
        return descriptionStateDB;
    }

    async getAll() {
        const descriptionStates: IDescriptionState[] = await DescriptionStateModel.find();
        return descriptionStates;
    }

    async getById(id: string) {
        return await DescriptionStateModel.findById(id);
    }

    async update(id: string, update: IDescriptionState) {
        const IDescriptionState = await DescriptionStateModel.findOneAndUpdate(
            {_id: id},
            {$set: update},
            {new: true}
        );
        return IDescriptionState;
    }

    async remove(id: string) {
        await DescriptionStateModel.deleteOne({_id: id});
        return "Personage object is delete";
    }
}

export default new DescriptionStateService();