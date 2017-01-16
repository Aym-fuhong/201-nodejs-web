import items from './routers/items';
import cart from './routers/cart';
import category from './routers/category';

export default function(app) {
    app.use('/items', items);
    app.use('/cart', cart);
    app.use('/category', category);
}