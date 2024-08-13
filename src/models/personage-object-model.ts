import {Schema, model} from "mongoose";

const PersonageObjectModel = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default model("Personage_object", PersonageObjectModel);