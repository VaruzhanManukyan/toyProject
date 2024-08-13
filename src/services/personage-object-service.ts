import PersonageObjectModel from "../models/personage-object-model";
import {IPersonageObject} from "../shared/interfaces/personage-object-interfaces";

class PersonageObjectService {
    async create(personageObject: IPersonageObject) {
        const {name} = personageObject;
        const personageObjectDB = new PersonageObjectModel({name: name});
        await personageObjectDB.save();
        return personageObjectDB;
    }

    async getAll() {
        const personageObjects: IPersonageObject[] = await PersonageObjectModel.find();
        return personageObjects;
    }

    async getById(id: string) {
        return await PersonageObjectModel.findById(id);
    }

    async update(id: string, update: IPersonageObject) {
        const personageObject = await PersonageObjectModel.findOneAndUpdate(
            {_id: id},
            {$set: update},
            {new: true}
        );
        return personageObject;
    }

    async remove(id: string) {
        await PersonageObjectModel.deleteOne({_id: id});
        return "Personage object is delete";
    }
}

export default new PersonageObjectService();