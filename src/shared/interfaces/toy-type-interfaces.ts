import {Schema} from "mongoose";

export interface IToyType extends Document {
    supplier_id: Schema.Types.ObjectId;
    personage_obj_state_id: Schema.Types.ObjectId;
    default_scenario_id: Schema.Types.ObjectId;
    price: Schema.Types.Decimal128;
    description: string;
    imageSrc?: string;
}