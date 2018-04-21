const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

router.use( async (req, res, next) => {
  if (req.cart) return next();

  if (req.session.cartId) {
    req.cart = await Order.findById(req.session.cartId).catch(next);
    console.log('req.session in cart id', req.session.passport.user)
    //if user is logged in AND req.cart is defined (done when user hits /api/cart), then set the cart.userId = req.session.passport.user
    let isLoggedIn;
    if (req.session.passport.user) isLoggedIn = req.session.passport.user
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

// TODO:
// if we want to check whether there's a user logged in, then we want to associate the cart with the logged-in user; could also do a findOrCreate -- device portability (a nice-to-have);
