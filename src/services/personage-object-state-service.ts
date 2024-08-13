import PersonageObjectState from "../models/personage-object-state-model";
import {IPersonageObjectState} from "../shared/interfaces/personage-object-state-interfaes";

class PersonageObjectStateService {
    async create(personageObjectState: IPersonageObjectState) {
        const personageObjectStateDB = new PersonageObjectState(personageObjectState);
        await personageObjectStateDB.save();
        return personageObjectStateDB;
    }

    async getAll() {
        const personageObjectsState: IPersonageObjectState[] = await PersonageObjectState.find();
        return personageObjectsState;
    }

    async getById(id: string) {
        return await PersonageObjectState.findById(id);
    }

    async update(id: string, update: IPersonageObjectState) {
        const personageObjectState = await PersonageObjectState.findOneAndUpdate(
            {_id: id},
            {$set: update},
            {new: true}
        );
        return personageObjectState;
    }

    async remove(id: string) {
        await PersonageObjectState.deleteOne({_id: id});
        return "Personage object State is delete";
    }
}

export default new PersonageObjectStateService();