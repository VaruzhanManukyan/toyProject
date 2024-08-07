import { Router } from 'express';
import SupplierController from "../controllers/supplier-controller";
import roleMiddleware from "../middlewares/role-middleware";

const router: Router = Router();

router.post("/create", roleMiddleware(['SUPER_ADMIN']), SupplierController.create);
router.get("/read", roleMiddleware(['SUPER_ADMIN']), SupplierController.getAll);
router.post("/read/:id", roleMiddleware(['SUPER_ADMIN']), SupplierController.getById);
router.post("/update/:id", roleMiddleware(['SUPER_ADMIN']), SupplierController.update);
router.post("/delete/:id", roleMiddleware(['SUPER_ADMIN']), SupplierController.remove);

export default router;
