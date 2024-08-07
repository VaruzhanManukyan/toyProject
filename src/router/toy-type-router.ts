import {Router} from 'express';
import SupplierController from "../controllers/supplier-controller";

const router: Router = Router();

router.post("/:supplierId/create", SupplierController.create);
router.post("/:supplierId/read", SupplierController.getById);
router.post("/:supplierId/read/:id", SupplierController.getById);
router.post("/:supplierId/update/:id", SupplierController.update);
router.post("/:supplierId/delete/:id", SupplierController.remove);

export default router;