const router = require('express').Router();
const { Order, Product, LineItems } = require('../db/models');

module.exports = router;

router.use( async (req, res, next) => {
  if (req.cart) return next();

  if (req.session.cartId) {
    req.cart = await Order.findById(req.session.cartId).catch(next);
    // console.log('req.session in cart id', req.session.passport.user)
    //if user is logged in AND req.cart is defined (done when user hits /api/cart), then set the cart.userId = req.session.passport.user
<<<<<<< HEAD
    let isLoggedIn;
    if (req.session.passport.user) isLoggedIn = req.session.passport.user;
    if (req.cart && isLoggedIn) {
      req.cart.userId = req.session.passport.user;
      console.log('req.cart in cart id', req.cart);
=======
    if (req.cart && req.user) {
      req.cart.userId = req.user.id;
      console.log('req.cart in cart id', req.cart)
>>>>>>> master
    }

    if (req.cart) return next();
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
  // req.cart.products = [{id: 7, price: 20.00}];
  // console.log('req.cart.products:', req.cart.products);
  req.cart.getProducts()
    .then(theProducts => res.json(theProducts))
    .catch(next);
});

router.post('/add-to-cart/products/:productId', async (req, res, next) => {
  console.log('got to back end and heres the cart', req.cart);
  console.log('product quantity in the back end: ', req.body.quantity);
  const newProduct = await Product.findById(req.params.productId).catch(next);
  //steps - recreate cart
  // let updatedOrder = await Order.create().catch(next);
  //do this only if there is a logged in user
  // if (req.cart.userId) updatedOrder.userId = req.cart.userId;
  // req.cart.addProduct(req.params.productId, { quantity: 1 });
  const [lineItem]= await LineItems.findOrCreate({ where: { productId: req.params.productId, orderId: req.cart.id },  defaults: { quantity: req.body.quantity, price: newProduct.price }})
  lineItem.quantity = req.body.quantity;
  await lineItem.save();
  await req.cart.reload();
  //get products already on cart
  // const oldProducts = await req.cart.getProducts().catch(next);
  // console.log('old products before adding: ', oldProducts);
  // let allProducts;
  //  //if new product is already on cart, increase its quantity
  // if (oldProducts.includes(newProduct)) {
  //   let index = oldProducts.indexOf(newProduct);
  //   oldProducts[index].quantity += req.body.quantity; //instead of incrementing by one, increment by the quantity sent back
  //   allProducts = oldProducts;
  // }
  // //if not, add new product to the existing products
  // else {
  //   console.log('ran!@')
  //   allProducts = oldProducts.concat([newProduct])
    
  // }

  // console.log('new product on cart: ', newProducts);
  // console.log('order is here', order);
  // //associate newProducts with req.cart
  // // req.cart = await order.addProducts(newProducts);
  // console.log('req.cart', req.cart)
  res.json(req.cart);
  //send back the new cart -- with the associated products. this is the end goal, (i think?) but right now can't find a way to associate products with cart
  // res.redirect('/api/cart');

})

// TODO:
// if we want to check whether there's a user logged in, then we want to associate the cart with the logged-in user; could also do a findOrCreate -- device portability (a nice-to-have);
