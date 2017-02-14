const item = require('./router/item');
const cart = require('./router/cart');
const category = require('./router/category');

module.exports = function(app) {
    app.use('/item', item);
    app.use('/cart', cart);
    app.use('/category', category);
};