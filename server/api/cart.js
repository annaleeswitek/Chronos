const router = require('express').Router();
const { Order, Product, LineItems } = require('../db/models');

module.exports = router;

router.use( async (req, res, next) => {
  if (req.cart) return next();

  if (req.session.cartId) {
    req.cart = await Order.findById(req.session.cartId).catch(next);
    if (req.cart && req.user) req.cart.userId = req.user.id;
    if (req.cart) return next();
  }

  req.cart = await Order.create().catch(next);
  req.session.cartId = req.cart.id;
  next();
});

router.get('/', (req, res, next) => {
  res.send(req.cart);
});


// router.get('/products', (req, res, next) => {
//   req.cart.getProducts()
//     .then(theProducts => res.json(theProducts))
//     .catch(next);
// });

router.post('/add-to-cart/products/:productId', async (req, res, next) => {
  const newProduct = await Product.findById(req.params.productId).catch(next);
  const [lineItem]= await LineItems.findOrCreate({ 
    where: { productId: req.params.productId, orderId: req.cart.id },  
    defaults: { quantity: req.body.quantity, price: newProduct.price }
  });
  lineItem.quantity = req.body.quantity;
  await lineItem.save();
  await req.cart.reload();
  
  res.json(req.cart);

})
