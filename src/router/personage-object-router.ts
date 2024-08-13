import { Router } from 'express';
import PersonageObjectController from "../controllers/personage-object-controller";
import roleMiddleware from "../middlewares/role-middleware";
import {Roles} from "../shared/enums/role-enum";

const router: Router = Router();

router.post("/create", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectController.create);
router.post("/read", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectController.getAll);
router.post("/read/:id", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectController.getById);
router.post("/update/:id", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectController.update);
router.post("/delete/:id", roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectController.remove);

export default router;
