import Item from '../models/item';

export default class ItemController {

  getAll(req, res, next) {
    Item.find((err, data) => {
      if(err) {
        next(err);
      }
      res.status(200).send({item:data});
    })
    }

  getOne(req, res, next) {
    const id = req.params.id;
    Item.findOne({_id: id}, (err, data) => {
      if(err) {
        next(err);
      }
      res.status(200).send({item:data});
    })
  }

  save(req, res, next) {
    const name = req.params.name;
    const price = req.params.price;
     new Item({name: name,price: price}).save( (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(201);
    })
  }

  delete(req, res, next) {
    const id = req.params.id;
    Item.delete({_id: id}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });

  }

  update(req, res, next){
    const id = req.params.id;
    const price = req.params.price;
    Item.delete({_id: id, price: price}, (err, data) => {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    });
  }
}
