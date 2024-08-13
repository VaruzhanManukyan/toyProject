import {Router} from 'express';
import DeviceController from "../controllers/device-controller";

const router: Router = Router();

router.post("/:supplierId/create", DeviceController.create);
router.post("/read", DeviceController.getAll);
router.post("/read/:id", DeviceController.getById);
router.post("/update/:id", DeviceController.update);
router.post("/delete/:id", DeviceController.remove);
router.post("/:userId/connect/:id", DeviceController.connect);

export default router;