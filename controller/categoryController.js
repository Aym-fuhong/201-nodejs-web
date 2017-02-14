const Category = require('../model/category');
const constant = require('../config/constant');

export default class CategoryController {

  getAll(req, res, next) {
    Category.find((err, data) => {
      if(err) {
        next(err);
      }
      res.status(constant.httpCode.OK).send({category:data});
    })
    }

  getOne(req, res, next) {
    const id = req.params.id;
    Category.findOne({_id: id}, (err, data) => {
      if(err) {
        next(err);
      }
      res.status(constant.httpCode.OK).send({category:data});
    })
  }

  save(req, res, next) {
     new Category(req.body).save( (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Category.delete({_id: id}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });

  }

  update(req, res, next){
    const id = req.params.id;
    const type = req.params.type;
    Category.delete({_id: id, type: type}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}
