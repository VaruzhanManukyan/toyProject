import {Schema, model} from "mongoose";

const SupplierModel = new Schema({
    name: {
        type: String,
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
        type: Number,
        required: true
    }
})

export default model("Supplier", SupplierModel);