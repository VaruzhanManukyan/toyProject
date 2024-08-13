import {Request, Response, NextFunction} from "express";
import {IRightTransaction} from "../shared/interfaces/right-transaction-interfaces";
import RightTransactionService from "../services/right-transaction-service";

class RightTransactionController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const rightTransaction: IRightTransaction = {
                buyer_id: request.body.buyer_id,
                user_ids: request.body.user_ids,
                device_id: request.body.device_id,
                scenario_id: request.body.scenario_id,
            }
            const rightTransactionSave = await RightTransactionService.create(rightTransaction);
            response.status(201).json(rightTransactionSave);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

export default new RightTransactionController();