const item = require('./router/item');
const cart = require('./router/cart');
const category = require('./router/category');

export default function(app) {
    app.use('/item', item);
    app.use('/cart', cart);
    app.use('/category', category);
}