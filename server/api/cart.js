const router = require('express').Router();
const { Order, Product, LineItems } = require('../db/models');

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
  let updatedOrder = await Order.create().catch(next);
  //do this only if there is a logged in user
  if (req.cart.userId) updatedOrder.userId = req.cart.userId;
 
  //get products already on cart
  const oldProducts = await req.cart.getProducts().catch(next);
  console.log('old products before adding: ', oldProducts);
  let allProducts;
   //if new product is already on cart, increase its quantity
  if (oldProducts.includes(newProduct)) {
    let index = oldProducts.indexOf(newProduct);
    oldProducts[index].quantity += req.body.quantity; //instead of incrementing by one, increment by the quantity sent back
    allProducts = oldProducts;
  }
  //if not, add new product to the existing products
  else {
    console.log('ran!@')
    allProducts = oldProducts.concat([newProduct])
    
  }
  console.log('new product on cart: ', allProducts);
  //set products on the newly created order
  await updatedOrder.setProducts(allProducts, { through: { status: LineItems }}).catch(next); //this line also sends back an aggregate error
  console.log('order is here', updatedOrder); 
  //now that newly created order is associated with all products, reassign req.cart to this order
  req.cart = updatedOrder;
  console.log('updated req.cart: ', req.cart);
  const updatedProducts = await req.cart.getProducts().catch(next);
  console.log('updated products are here: ', updatedProducts);
  //req.cart = await order.addProducts(newProducts); //this line sends back an aggregate error?? everything's fine up until now
  console.log('req.cart', req.cart)
  //option 1: send back the new cart?
  // res.redirect('/api/cart');
  //option 2: send back the cart products -- do this but first find a way to associate updatedProducts
  res.json(allProducts);
})

// TODO:
// if we want to check whether there's a user logged in, then we want to associate the cart with the logged-in user; could also do a findOrCreate -- device portability (a nice-to-have);
