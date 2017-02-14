const Cart = require('../model/cart');
const constant = require('../config/constant');

class CartController {

  getAll(req, res, next) {
    Cart.find((err, data) => {
      if(err) {
        next(err);
      }
      res.status(constant.httpCode.OK).send({cart:data});
    })
    }

  getOne(req, res, next) {
    const id = req.params.id;
    Cart.findOne({_id: id}, (err, data) => {
      if(err) {
        next(err);
      }
      res.status(constant.httpCode.OK).send({cart:data});
    })
  }

  save(req, res, next) {
     new Cart(req.body).save( (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Cart.delete({_id: id}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });

  }

  update(req, res, next){
    const id = req.params.id;
    const size = req.params.size;
    Cart.delete({_id: id, size: size}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
module.exports = CartController;