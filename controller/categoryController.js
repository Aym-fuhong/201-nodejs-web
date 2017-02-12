import Category from '../models/category';

export default class CategoryController {

  getAll(req, res, next) {
    Category.find((err, data) => {
      if(err) {
        next(err);
      }
      res.status(200).send({category:data});
    })
    }

  getOne(req, res, next) {
    const id = req.params.id;
    Category.findOne({_id: id}, (err, data) => {
      if(err) {
        next(err);
      }
      res.status(200).send({category:data});
    })
  }

  save(req, res, next) {
    const type = req.params.type;
     new Category({type: type}).save( (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(201);
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Category.delete({_id: id}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });

  }

  update(req, res, next){
    const id = req.params.id;
    const type = req.params.type;
    Category.delete({_id: id, type: type}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });
  }
}
