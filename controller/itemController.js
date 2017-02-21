const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class ItemController {

  getAll(req, res, next) {
    async.series({
      items: (done) => {
        Item.find({})
            .populate('category')
            .exec(done);
      },
      totalCount: (done) => {
        Item.count(done);
      }
    }, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(data);
    });

  }

  getOne(req, res, next) {
    const itemId = req.params.id;
    Item.findById(itemId)
        .populate('category')
        .exec((err, data) => {
          if (err) {
            return next(err);
          }
          if (!data) {
            return res.sendStatus(constant.httpCode.NOT_FOUND);
          }
          return res.status(constant.httpCode.OK).send({item: data});
        });
  }

  create(req, res, next) {
    Item.create(req.body, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `Item/${data._id}`});
    })
  }

  delete(req, res, next) {
    const itemId = req.params.id;
    Item.findByIdAndRemove(itemId, (err, data) => {
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
    const itemId = req.params.id;
    Item.findByIdAndUpdate(itemId, req.body, (err, data) => {
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
module.exports = ItemController;