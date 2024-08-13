import ApiError from "../exceptions/api-error";

import PublisherModel from "../models/publisher-model";
import ScenarioModel from "../models/scenario-model";
import UserModel from "../models/user-model";
import DeviceModel from "../models/device-model";
import deviceModel from "../models/device-model";
import AudioFileModel from "../models/audio-file-model";
import PersonageObjectStateModel from "../models/personage-object-state-model";
import PersonageObjectModel from "../models/personage-object-model";
import DescriptionStateModel from "../models/description-state-model";
import ToyTypeModel from "../models/toy-type-model";
import RightTransactionModel from "../models/right-transaction-model";
import supplierModel from "../models/supplier-model";

import {IPersonageObjStateAllInfo, IRightTransaction} from "../shared/interfaces/right-transaction-interfaces";
import {IPersonageObjectState} from "../shared/interfaces/personage-object-state-interfaes";
import SupplierModel from "../models/supplier-model";

class RightTransactionService {
    async create(rightTransaction: IRightTransaction) {
        const {
            buyer_id,
            device_id,
            scenario_id,
        } = rightTransaction;

        const buyer = await UserModel.findOne({_id: buyer_id}) || await DeviceModel.findOne({buyer_id});
        if (!buyer) {
            throw ApiError.BadRequest(`Buyer with id ${buyer_id} not found.`);
        }

        const scenario = await ScenarioModel.findOne({_id: scenario_id});
        if (!scenario) {
            throw ApiError.BadRequest(`Scenario with id ${scenario_id} not found.`);
        }

        const personage_obj_state_all_info: IPersonageObjStateAllInfo[] = [];
        const personage_obj_state_ids = scenario.personage_obj_state_ids;
        for (const personage_obj_state_id of personage_obj_state_ids) {
            const toyType = await ToyTypeModel.findOne({personage_obj_state_id: personage_obj_state_id});
            if (!toyType) {
                throw ApiError.BadRequest("This personage object state does not have a toy type.");
            }

            const toyTypeSupplier = await SupplierModel.findOne({_id: toyType.supplier_id});
            if(!toyTypeSupplier){
                throw ApiError.BadRequest("This toy type does not have a supplier.");
            }

            const personageObjectState: IPersonageObjectState | null = await PersonageObjectStateModel.findOne({_id: personage_obj_state_id});
            if (!personageObjectState) {
                throw ApiError.BadRequest(`Personage object state with id ${personage_obj_state_ids} not found.`);
            }

            const personage_object_id: string = personageObjectState.personage_obj_id;
            const personageObject = await PersonageObjectModel.findOne({_id: personage_object_id});
            if (!personageObject) {
                throw ApiError.BadRequest(`Personage object with id ${personage_object_id} not found.`);
            }

            const description_state_ids: string[] = personageObjectState.description_state_ids;
            for (const description_state_id of description_state_ids) {
                const descriptionStateId = await DescriptionStateModel.findOne({_id: description_state_id});
                if (!descriptionStateId) {
                    throw ApiError.BadRequest(`Description state with id ${description_state_id} not found.`);
                }
            }

            personage_obj_state_all_info.push({
                toy_type_supplier_id: toyType.supplier_id.toString(),
                toy_type_id: toyType._id.toString(),
                personage_obj_state_id: personage_obj_state_id.toString(),
                personage_object_id: personage_object_id,
                description_state_ids: description_state_ids
            });
        }

        const user_ids = [];
        const users = await UserModel.find({ device_ids: { $in: device_id } });
        for (const user of users) {
            const userDB = await UserModel.findOne({_id: user._id});
            if (!userDB) {
                throw ApiError.BadRequest(`User with id ${user._id} not found.`);
            }
            user_ids.push(user._id);
        }

        const device = await deviceModel.findOne({_id: device_id});
        if (!device) {
            throw ApiError.BadRequest(`Device with id ${device_id} not found.`);
        }

        const publisher = await PublisherModel.findOne({scenario_ids: scenario_id});
        if (!publisher) {
            throw ApiError.BadRequest(`This scenario has not publisher`);
        }
        const publisher_id = publisher._id;

        const audio_file_ids = scenario.audio_file_ids;
        for (const audio_file_id of audio_file_ids) {
            const audioFile = await AudioFileModel.findOne({_id: audio_file_id});
            if (!audioFile) {
                throw ApiError.BadRequest(`AudioFile with id ${audio_file_id} not found.`);
            }
        }

        const device_supplier_id: string = device.supplier_id;
        const supplier = await supplierModel.findOne({_id: device_supplier_id});
        if (!supplier) {
            throw ApiError.BadRequest(`Supplier with id ${device.supplier_id} not found.`);
        }

        const rightTransactionDB = new RightTransactionModel({
            buyer_id,
            user_ids,
            device_id,
            publisher_id,
            scenario_id,
            audio_file_ids,
            device_supplier_id,
            personage_obj_state_all_info
        });

        await rightTransactionDB.save();
        return rightTransactionDB;
    }
}

export default new RightTransactionService();