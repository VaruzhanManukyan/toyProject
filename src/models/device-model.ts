import {Schema, model} from "mongoose";

const DeviceModel = new Schema({
    supplier_id: {
        type: String,
        required: true
    },
    production_date: {
        type: Date,
        default: Date.now
    },
    serial_number: {
        type: String,
        required: true
    }
});

export default model("Devices", DeviceModel);