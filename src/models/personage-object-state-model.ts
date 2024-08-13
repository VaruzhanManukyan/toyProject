import {Schema, model} from "mongoose";

const PersonageObjectStateModel = new Schema({
    personage_obj_id: {
        ref: "Personage_object",
        type: Schema.Types.ObjectId,
        required: true
    },
    description_state_ids: [{ type: Schema.Types.ObjectId, ref: 'Description_state' }]
});

export default model("Personage_object_state", PersonageObjectStateModel);