import {Schema, model} from "mongoose";

const PublisherModel = new Schema({
    scenario_ids: [{ type: Schema.Types.ObjectId, ref: 'Scenario' }],
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

export default model("Publisher", PublisherModel);