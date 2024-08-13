import { Router } from 'express';
import ToyController from "../controllers/toy-controller";
import roleMiddleware from "../middlewares/role-middleware";
import { Roles } from "../shared/enums/role-enum";

const router: Router = Router();

router.post("/create", roleMiddleware([Roles.SUPER_ADMIN]), ToyController.create);
router.post("/read", roleMiddleware([Roles.SUPER_ADMIN]), ToyController.getAll);
router.post("/read/:id", roleMiddleware([Roles.SUPER_ADMIN]), ToyController.getById);
router.post("/update/:id", roleMiddleware([Roles.SUPER_ADMIN]), ToyController.update);
router.post("/delete/:id", roleMiddleware([Roles.SUPER_ADMIN]), ToyController.remove);

export default router;