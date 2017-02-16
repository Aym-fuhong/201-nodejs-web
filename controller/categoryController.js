const Category = require('../model/category');
const constant = require('../config/constant');

class CategoryController {

  getAll(req, res, next) {
    Category.find((err, data) => {
      if(err) {
        next(err);
      }
      if(!data) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send({category:data});
    })
    }

  getOne(req, res, next) {
    const categoryId = req.params.id;
    Category.findById(categoryId, (err, data) => {
      if(err) {
        next(err);
      }
      if(!data) {
        res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.status(constant.httpCode.OK).send({category:data});
    })
  }

  create(req, res, next) {
     Category.create(req.body, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const categoryId = req.params.id;
    Category.findByIdAndRemove(categoryId, (err, data) => {
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
    const categoryId = req.params.id;
    Category.findByIdAndUpdate(categoryId, req.body, (err, data) => {
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
module.exports = CategoryController;