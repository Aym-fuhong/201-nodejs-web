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
    const name = req.params.name;
    const  size = req.params.size;
     new Category({name: name,size: size}).save( (err, data) => {
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
    const size = req.params.size;
    Category.delete({_id: id, size: size}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });
  }
}
