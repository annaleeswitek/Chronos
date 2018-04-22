const router = require('express').Router();
const { Order, Product } = require('../db/models');

module.exports = router;

router.use( async (req, res, next) => {
  if (req.cart) return next();

  if (req.session.cartId) {
    req.cart = await Order.findById(req.session.cartId).catch(next);
    // console.log('req.session in cart id', req.session.passport.user)
    //if user is logged in AND req.cart is defined (done when user hits /api/cart), then set the cart.userId = req.session.passport.user
    let isLoggedIn;
    if (req.session.passport && req.session.passport.user) isLoggedIn = req.session.passport.user
    if (req.cart && isLoggedIn) {
      req.cart.userId = req.session.passport.user;
      console.log('req.cart in cart id', req.cart)
    }

    return next();
  }

  req.cart = await Order.create().catch(next);
  req.session.cartId = req.cart.id;
  console.log('req.session', req.session)
  next();
});

router.get('/', (req, res, next) => {
  res.send(req.cart);
});

router.get('/products', (req, res, next) => {
  req.cart.products = [{id: 7, price: 20.00}];
  console.log('req.cart.products:', req.cart.products);
  req.cart.getProducts()
    .then(theProducts => res.json(theProducts))
    .catch(next);
});

router.post('/add-to-cart/products/:productId', async (req, res, next) => {
  console.log('got to back end and heres the cart', req.cart);
  console.log('in the back: ', req.params.productId);
  const product = await Product.findById(req.params.productId);
  //steps - recreate cart with new product
  let order = await Order.create().catch(next);
  const products = await req.cart.getProducts();
  let newProducts;
  if (products.includes(product)) {
    let index = products.indexOf(product);
    products[index].quantity++;
  }
  else {
    console.log('ran!@')
    newProducts = products.concat([product])
    
  }
  console.log('new product on cart: ', newProducts);
  console.log('order is here', order);
  req.cart = await order.addProducts(newProducts);
  console.log('req.cart', req.cart)
  //send back the new cart
  res.redirect('/api/cart');
})

// TODO:
// if we want to check whether there's a user logged in, then we want to associate the cart with the logged-in user; could also do a findOrCreate -- device portability (a nice-to-have);
