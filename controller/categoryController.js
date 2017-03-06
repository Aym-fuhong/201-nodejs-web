const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class CategoryController {

  getAll(req, res, next) {
    async.series({
      items: (done) => {
        Category.find({}, done);
      },
      totalCount: (done) => {
        Category.count(done);
      }
    }, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(data);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.id;
    Category.findById(categoryId, (err, data) => {
      if (err) {
        return next(err);
      }
      if (!data) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send({category: data});
    })
  }

  create(req, res, next) {
    Category.create(req.body, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `Category/${data._id}`});
    })
  }

  delete(req, res, next) {
    const categoryId = req.params.id;
    async.waterfall([
      (done) => {
        Item.findOne({categoryId}, done);
      },
      (data, done) => {
        if (data) {
          done(true, null);
        } else {
          Category.findByIdAndRemove(categoryId, (err, data) => {
            if (!data) {
              done(false, null);
            }
            done(err, data);
          });
        }
      }
    ], (err)=> {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err === false) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });


  }

  update(req, res, next) {
    const categoryId = req.params.id;
    Category.findByIdAndUpdate(categoryId, req.body, (err, data) => {
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
module.exports = CategoryController;