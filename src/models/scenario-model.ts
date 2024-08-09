import {Schema, model} from "mongoose";

const ScenarioModel = new Schema({
    audio_file_ids: [{ type: Schema.Types.ObjectId, ref: 'Audio_file' }],
    personage_obj_state_ids: [{ type: Schema.Types.ObjectId, ref: 'Personage_object_state' }],
    name: {
        type: String,
        required: true
    }
});

export default model("Scenario", ScenarioModel);