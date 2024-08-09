import { Router } from 'express';
import SupplierController from "../controllers/supplier-controller";
import roleMiddleware from "../middlewares/role-middleware";
import {Roles} from "../shared/enums/role-enum";

const router: Router = Router();

router.post("/create", roleMiddleware([Roles.SUPER_ADMIN]), SupplierController.create);
router.post("/read", roleMiddleware([Roles.SUPER_ADMIN]), SupplierController.getAll);
router.post("/read/:id", roleMiddleware([Roles.SUPER_ADMIN]), SupplierController.getById);
router.post("/update/:id", roleMiddleware([Roles.SUPER_ADMIN]), SupplierController.update);
router.post("/delete/:id", roleMiddleware([Roles.SUPER_ADMIN]), SupplierController.remove);

export default router;