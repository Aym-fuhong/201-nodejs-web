const {Router} = require('express');
const ItemController = require('../../controller/itemController');


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOne);
router.post('/', itemCtrl.save);
router.delete('/:id', itemCtrl.delete);
router.put('/:id', itemCtrl.update);

module.exports = router;