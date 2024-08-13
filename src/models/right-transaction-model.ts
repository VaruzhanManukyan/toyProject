import {Schema, model} from "mongoose";

const RightTransactionModel = new Schema({
    buyer_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user_ids: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    device_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    device_supplier_id: {
        type: String,
        required: true
    },
    publisher_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    scenario_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    audio_file_ids: [{ type: Schema.Types.ObjectId, ref: "Audio_file" }],
    personage_obj_state_all_info: [
        {
            toy_type_supplier_id: {
                ref: "Supplier",
                type: Schema.Types.ObjectId,
                required: true
            },
            toy_type_id: {
                ref: "Toy_type",
                type: Schema.Types.ObjectId,
                required: true
            },
            personage_obj_state_id: {
                ref: "Personage_object_state",
                type: Schema.Types.ObjectId,
                required: true
            },
            personage_object_id: {
                ref: "Personage_object",
                type: Schema.Types.ObjectId,
                required: true
            },
            description_state_ids: [{
                ref: "Description_state",
                type: Schema.Types.ObjectId,
                required: true
            }]
        }
    ]
});

export default model("Right_transaction", RightTransactionModel);