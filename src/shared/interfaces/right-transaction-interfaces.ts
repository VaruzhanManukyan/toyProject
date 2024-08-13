export interface IRightTransaction {
    buyer_id: string;
    user_ids: string[];
    device_id: string;
    scenario_id: string;
}

export interface IPersonageObjStateAllInfo {
    toy_type_supplier_id: string;
    personage_obj_state_id: string;
    toy_type_id: string;
    personage_object_id: string;
    description_state_ids: string[];
}