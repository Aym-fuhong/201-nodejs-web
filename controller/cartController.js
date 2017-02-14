const Cart = require('../model/cart');

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
     new Cart(req.body).save( (err, data) => {
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
    const size = req.params.size;
    Cart.delete({_id: id, size: size}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });
  }
}
