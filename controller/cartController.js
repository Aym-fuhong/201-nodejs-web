const Cart = require('../model/cart');
const constant = require('../config/constant');

class CartController {

  getAll(req, res, next) {
    Cart.find({}, (err, data) => {
      if(err) {
        next(err);
      }
      if (!data){
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send({cart:data});
    })
    }

  getOne(req, res, next) {
    const cartId = req.params.id;
    Cart.findById(cartId, (err, data) => {
      if(err) {
        next(err);
      }
      if (!data){
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send({cart:data});
    })
  }

  create(req, res, next) {
     Cart.create(req.body, (err, data) => {
      if (err) {
        next(err);
      }
      res.status(constant.httpCode.CREATED).send({uri: `cart/${data._id}`});
    })
  }

  delete(req, res, next) {
    const cartId = req.params.id;
    Cart.findByIdAndRemove(cartId, (err, data) => {
      if (err) {
        next(err);
      }
      if (!data){
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });

  }

  update(req, res, next){
    const cartId = req.params.id;
    Cart.findByIdAndUpdate(cartId, req.body, (err, data) => {
      if (err) {
        next(err);
      }
      if (!data){
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
module.exports = CartController;