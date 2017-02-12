import item from './routers/item';
import cart from './routers/cart';
import category from './routers/category';

export default function(app) {
    app.use('/item', item);
    app.use('/cart', cart);
    app.use('/category', category);
}