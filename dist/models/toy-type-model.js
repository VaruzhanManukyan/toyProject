"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ToyTypeSchema = new mongoose_1.Schema({
    supplier_id: {
        ref: 'Supplier',
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    personage_obj_state_id: {
        ref: 'Personage_object_state',
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    default_scenario_id: {
        ref: 'Scenario',
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: mongoose_1.Schema.Types.Decimal128,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String
    }
});
exports.default = (0, mongoose_1.model)('ToyType', ToyTypeSchema);
