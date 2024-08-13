import {Schema, model} from "mongoose";

const ToyModel = new Schema({
    toy_type_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    RFID: {
        type: String,
        required: true
    }
});

export default model("Toy", ToyModel);