import {Router} from 'express';
import CategoryController from '../../controller/categoryController';


const router = Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getOne);
router.post('/', categoryCtrl.save);
router.delete('/:id', categoryCtrl.delete);
router.put('/:id', categoryCtrl.update);

export default router;