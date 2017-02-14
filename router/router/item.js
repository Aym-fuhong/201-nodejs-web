import {Router} from 'express';
import ItemController from '../../controller/ItemController';


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOne);
router.post('/', itemCtrl.save);
router.delete('/:id', itemCtrl.delete);
router.put('/:id', itemCtrl.update);

export default router;