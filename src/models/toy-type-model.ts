import { Schema, model } from 'mongoose';

const ToyTypeSchema = new Schema({
    supplier_id: {
        ref: 'Supplier',
        type: Schema.Types.ObjectId,
        required: true
    },
    personage_obj_state_id: {
        ref: 'Personage_object_state',
        type: Schema.Types.ObjectId,
        required: true
    },
    default_scenario_id: {
        ref: 'Scenario',
        type: Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
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

export default model('Toy_type', ToyTypeSchema);
