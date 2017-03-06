require('should');
const express = require('express');
const Cart = require('../model/cart');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('CartController test', ()=> {
  it('get/cart  should return all carts', (done) => {
    request
        .get('/cart')
        .expect(200)
        .expect((res) => {
          res.body.totalCount.should.equal(1);
          res.body.carts.length.should.equal(1);
        })
        .end(done);
  });

  it('get/cart/:id  should return one cart', (done) => {
    request
        .get('/cart/587f0f2586653d19297d40c6')
        .expect(200)
        .expect((res) => {
          res.body.cart.should.eql({
            "_id": "587f0f2586653d19297d40c6",
            "userId": "1",
            "__v": 0,
            "items": [
              {
                "uri": "item/587f0f2586653d19297d40c2",
                "count": 1
              },
              {
                "uri": "item/587f0f2586653d19297d40c3",
                "count": 1
              },
              {
                "uri": "item/587f0f2586653d19297d40c4",
                "count": 1
              }
            ]
          });
        })
        .end(done);
  });

  it('post/cart it should return uri',(done) => {
    const cart = {
      userId: '2',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };
    request
        .post('/cart')
        .send(cart)
        .expect(201)
        .expect((res) => {
          Cart.find({userId: '2'}, (err,doc) => {
            console.log(doc);
            res.body.uri.equal(`cart/${doc._id}`);
          });
        })
        .end(done);
  });

  it('put/cart   it should return 204',(done) =>{
    const cartId = '587f0f2586653d19297d40c6';
    const cart = {
      userId: '9',
      items: [
        {
          item: '587f0f2586653d19297d40c2',
          count: 4,
        }
      ]
    };

request
    .put(`/cart/${cartId}`)
    .send(cart)
    .expect(204)
    .end(done);
  });

  it('delete/cart/:id  it should return 204', (done) => {
    request
        .delete('/cart/587f0f2586653d19297d40c6')
        .expect(204)
        .end(done);
  });
});