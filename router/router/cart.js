const {Router} = require('express');
const CartController = require('../../controller/cartController');


const router = Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:id', cartCtrl.getOne);
router.post('/', cartCtrl.save);
router.delete('/:id', cartCtrl.delete);
router.put('/:id', cartCtrl.update);

export default router;