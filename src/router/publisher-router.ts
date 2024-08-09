import { Router } from 'express';
import roleMiddleware from "../middlewares/role-middleware";
import {Roles} from "../shared/enums/role-enum";
import PublisherController from "../controllers/publisher-controller";

const router: Router = Router();

router.post("/create", roleMiddleware([Roles.SUPER_ADMIN]), PublisherController.create);
router.post("/read", roleMiddleware([Roles.SUPER_ADMIN]), PublisherController.getAll);
router.post("/read/:id", roleMiddleware([Roles.SUPER_ADMIN]), PublisherController.getById);
router.post("/update/:id", roleMiddleware([Roles.SUPER_ADMIN]), PublisherController.update);
router.post("/delete/:id", roleMiddleware([Roles.SUPER_ADMIN]), PublisherController.remove);

export default router;