const Cart = require('../model/cart');
const constant = require('../config/constant');
const async = require('async');

const mapItemToUri = (items) => {
  return items.map(({item, count}) => {
    return {uri: `item/${item}`, count};
  });
};

class CartController{

  getAll(req, res, next) {
    async.series({
      items: (done) => {
        Cart.find({}, (err, data) => {
          if (err) {
            return done(err);
          }
          let carts = data.map((doc) => {
            const cart = doc.toJSON();
            cart.items = mapItemToUri(cart.items);
            return cart;
          });
          done(null, carts);
        })
      },
      totalCount: (done) => {
        Cart.count(done);
      }
    }, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(data);
    });
  }

  getOne(req, res, next) {
    const cartId = req.params.id;
    Cart.findById(cartId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      const data = doc.toJSON();
      const items = data.items;
      data.items = mapItemToUri(items);
      return res.status(constant.httpCode.OK).send({cart: data});
    })
  }

  create(req, res, next) {
    Cart.create(req.body, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `cart/${data._id}`});
    })
  }

  delete(req, res, next) {
    const cartId = req.params.id;
    Cart.findByIdAndRemove(cartId, (err, data) => {
      if (err) {
        return next(err);
      }
      if (!data) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });

  }

  update(req, res, next) {
    const cartId = req.params.id;
    Cart.findByIdAndUpdate(cartId, req.body, (err, data) => {
      if (err) {
        return next(err);
      }
      if (!data) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
module.exports = CartController;