import { Router } from 'express';
import DescriptionStateController from "../controllers/description-state-controller";
import roleMiddleware from "../middlewares/role-middleware";
import {Roles} from "../shared/enums/role-enum";

const router: Router = Router();

router.post("/create", roleMiddleware([Roles.SUPER_ADMIN]), DescriptionStateController.create);
router.post("/read", roleMiddleware([Roles.SUPER_ADMIN]), DescriptionStateController.getAll);
router.post("/read/:id", roleMiddleware([Roles.SUPER_ADMIN]), DescriptionStateController.getById);
router.post("/update/:id", roleMiddleware([Roles.SUPER_ADMIN]), DescriptionStateController.update);
router.post("/delete/:id", roleMiddleware([Roles.SUPER_ADMIN]), DescriptionStateController.remove);

export default router;
