import { Router } from 'express';
import ToyTypeController from '../controllers/toy-type-controller';
import roleMiddleware from '../middlewares/role-middleware';
import { Roles } from '../shared/enums/role-enum';

const router: Router = Router();

router.post('/create', roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeController.create);
router.post('/read', roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeController.getAll);
router.post('/read/:id', roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeController.getById);
router.post('/update/:id', roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeController.update);
router.post('/delete/:id', roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeController.remove);
router.post('/search/price', roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeController.searchByPriceRange);
router.post('/supplier/:supplierId', roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeController.findBySupplier);

export default router;
