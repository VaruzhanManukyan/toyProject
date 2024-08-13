import { Router } from 'express';
import roleMiddleware from "../middlewares/role-middleware";
import {Roles} from "../shared/enums/role-enum";
import PersonageObjectStateController from "../controllers/personage-object-state-controller";

const router: Router = Router();

router.post("/create", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectStateController.create);
router.post("/read", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectStateController.getAll);
router.post("/read/:id", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectStateController.getById);
router.post("/update/:id", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectStateController.update);
router.post("/delete/:id", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectStateController.remove);

export default router;
