import { Router } from 'express';
import RightTransactionController from "../controllers/right-transaction-controller";
import roleMiddleware from "../middlewares/role-middleware";
import {Roles} from "../shared/enums/role-enum";

const router: Router = Router();

router.post("/create", roleMiddleware([Roles.SUPER_ADMIN]), RightTransactionController.create);

export default router;
