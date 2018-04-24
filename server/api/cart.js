const router = require('express').Router();
const { Order, Product, LineItem } = require('../db/models');

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

// add to cart
router.post('/add-to-cart/products/:productId', async (req, res, next) => {
  const quantityToAdd = +req.body.quantityToAdd;
  const newProduct = await Product.findById(req.params.productId).catch(next);
  const [lineItem, wasCreated]= await LineItem.findOrCreate({ 
    where: { productId: req.params.productId, orderId: req.cart.id },  
    //these defaults only apply if the line item is being created
    defaults: { quantity: req.body.quantityToAdd, price: newProduct.price }
  });
  //if line item was found rather than created, then the quantity needs to be incremented
  //price on line item table is equal to the product.price -- NOT lineItem.quantity * newProduct.price
  if (!wasCreated) lineItem.quantity += quantityToAdd;
  
  await lineItem.save();
  await req.cart.reload();
  
  res.json(req.cart);

})

// remove from cart
router.post('/remove-from-cart/products/:productId', async (req, res, next) => {
  const quantityToRemove = +req.body.quantityToRemove;
  const lineItem = await LineItem.findOne({ where: { productId: req.params.productId, orderId: req.cart.id }});
  const currentQuantity = +lineItem.quantity;
  const newQuantity = currentQuantity - quantityToRemove;
  const newPrice = newQuantity*req.body.price;
  await lineItem.update({ quantity: newQuantity, price: newPrice});
  if (lineItem.quantity <= 0) await lineItem.destroy();
  res.json(req.cart);
})
