const Item = require('../model/item');
const constant = require('../config/constant');

export default class ItemController {

  getAll(req, res, next) {
    Item.find((err, data) => {
      if(err) {
        next(err);
      }
      res.status(constant.httpCode.OK).send({item:data});
    })
    }

  getOne(req, res, next) {
    const id = req.params.id;
    Item.findOne({_id: id}, (err, data) => {
      if(err) {
        next(err);
      }
      res.status(constant.httpCode.OK).send({item:data});
    })
  }

  save(req, res, next) {
     new Item(req.body).save( (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Item.delete({_id: id}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });

  }

  update(req, res, next){
    const id = req.params.id;
    const price = req.params.price;
    Item.delete({_id: id, price: price}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
