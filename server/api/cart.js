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


//add to cart 
router.post('/add-to-cart/products/:productId', async (req, res, next) => {
  const newProduct = await Product.findById(req.params.productId).catch(next);
  const [lineItem]= await LineItem.findOrCreate({ 
    where: { productId: req.params.productId, orderId: req.cart.id },  
    defaults: { quantity: req.body.quantity, price: newProduct.price }
  });
  await lineItem.save();
  await req.cart.reload();
  
  res.json(req.cart);

})


//remove from cart
router.post('/remove-from-cart/products/:productId', async (req, res, next) => {
  const quantityToRemove = +req.body.quantityToRemove;
  console.log('this is req.cart on backend remove: ', req.cart);
  console.log('these are products in req.cart on backend before remove: ', req.cart.products);
  const lineItem = await LineItem.findOne({ 
    where: { productId: req.params.productId, orderId: req.cart.id }
  })
  console.log('this is the line item on backend before remove: ', lineItem)
  console.log('this is the line item quantity on backend before remove: ', lineItem.quantity)
  console.log('this is quantity to remove on backend before remove: ', +req.body.quantityToRemove);
  const newQuantity = lineItem.quantity - quantityToRemove;
  console.log('this is the new quantity in back end remove: ', newQuantity)
  await lineItem.update({ quantity: newQuantity });
  console.log('this is line item quantity after update: ', lineItem.quantity);
  if (lineItem.quantity <= 0){
    console.log('destroying line item on backend');
    await lineItem.destroy();
    console.log('destroyed')
  }
  console.log('this is the line item on backend after remove (should be undefined if req.body.quantity is undefined, actually its not!! still have reference to it, but its no longer in database) : ', lineItem);
  console.log('this is req.cart after backend remove: ', req.cart);
  console.log('these are the products in req.cart after backend remove: ', req.cart.products)
  res.json(req.cart);
})
