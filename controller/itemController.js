const Item = require('../model/item');
const constant = require('../config/constant');

class ItemController {

  getAll(req, res, next) {
    Item.find({}, (err, data) => {
      if(err) {
        next(err);
      }
      if(!data) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send({item:data});
    })
    }

  getOne(req, res, next) {
    const itemId = req.params.id;
    Item.findById(itemId, (err, data) => {
      if(err) {
        next(err);
      }
      if(!data) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send({item:data});
    })
  }

  create(req, res, next) {
     Item.create(req.body, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const itemId = req.params.id;
    Item.findByIdAndRemove(itemId, (err, data) => {
      if (err) {
        next(err);
      }
      if(!data) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });

  }

  update(req, res, next){
    const itemId = req.params.id;
    Item.findByIdAndUpdate(itemId, req.body, (err, data) => {
      if (err) {
        next(err);
      }
      if(!data) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
module.exports = ItemController;