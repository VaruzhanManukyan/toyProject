import {Router} from 'express';
import UserController from "../controllers/user-controller";

const router: Router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);

export default router;