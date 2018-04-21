const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

router.use( async (req, res, next) => {
  if (req.cart) return next();

  if (req.session.cartId) {
    req.cart = await Order.findById(req.session.cartId).catch(next);
    return next();
  }

  req.cart = await Order.create().catch(next);
  req.session.cartId = req.cart.id;
  next();
});

router.get('/', (req, res, next) => {
  res.send(req.cart);
});
