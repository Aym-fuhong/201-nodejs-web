import Cart from '../models/cart';

export default class CartController {

  getAll(req, res, next) {
    Cart.find((err, data) => {
      if(err) {
        next(err);
      }
      res.status(200).send({cart:data});
    })
    }

  getOne(req, res, next) {
    const id = req.params.id;
    Cart.findOne({_id: id}, (err, data) => {
      if(err) {
        next(err);
      }
      res.status(200).send({cart:data});
    })
  }

  save(req, res, next) {
    const name = req.params.name;
     new Cart({name:name}).save( (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(201);
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Cart.delete({_id: id}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });

  }

  update(req, res, next){
    const id = req.params.id;
    const weight = req.params.weight;
    Cart.delete({_id: id, weight: weight}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });
  }
}
