const router = require('express').Router();
const { Order, Product } = require('../db/models');

module.exports = router;

router.use( async (req, res, next) => {
  if (req.cart) return next();

  if (req.session.cartId) {
    req.cart = await Order.findById(req.session.cartId).catch(next);
    console.log('current user in cart id', req.session.passport.user)
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
  console.log('getting cart')
  res.json(req.cart);
});

router.get('/products', (req, res, next) => {
  // req.cart.products = [{id: 7, price: 20.00}];
  // console.log('req.cart.products:', req.cart.products);
  req.cart.getProducts()
    .then(theProducts => {
      console.log('products in /products: ', theProducts);
      res.json(theProducts)
  })
    .catch(next);
});

router.get('/add-to-cart/products/:productId', (req, res, next) => {
  let product;
  let order;
  Product.findById(1)
    .then(p => product = p)
    .then(async product => {
      console.log('product??', product.dataValues);
      order = await Order.findById(1)
      return {product, order}
    })
    .then(async object => {
      let newProduct = object.product.dataValues;
      let currentOrder = object.order.dataValues;
      console.log('order???', currentOrder)
      let associatedProductPromises = await object.order.addProducts([object.product]).catch(next)
      // console.log('associated products promises:', associatedProductPromises)
    })
    // .then(order => console.log('order??', order))
    .catch(next)
  // products = JSON.stringify(products);
    // Order.findById(1)
    //   .then(order => order.addProducts([product]))
    //   .then(associatedProductPromises => Promise.all(associatedProductPromises))
    //   .then(associatedProducts => console.log('associated products? ', associatedProducts))
    //   .catch(next)
    // let allProducts = await req.cart.setProducts(products).catch(next)
  // let newProduct;
  // Product.findById(req.params.productId)
  //   .then(product => {
  //     console.log('new product: ', product)
  //     console.log('req.cart: ', req.cart)
  //     newProduct = product;
  //     let oldProducts = req.cart.getProducts();
  //     return ([oldProducts, newProduct])
  //   })
  //   .then(productPromises => Promise.all(productPromises))
  //   .then(products => {
  //     products.forEach(product => console.log('one product: ', product.dataValues))
  //     return products.map(product => product.dataValues);
  //   })
  //   .then(allProducts => {
  //     return allProducts.filter(product => {
  //       if(product) return product
  //     })
  //   })
  //   .then(products => {
  //     console.log('products: ', products)
  //     return req.cart.setProducts(products)
  //     // return ([associatedProducts])
  //   })
  //   .then(associatedProductsPromises => console.log('associated: ', associatedProductsPromises))
  //   .catch(next)
    // if (newProduct)console.log('new product', newProduct)
  // Product.findById(req.params.productId)
    // .then(product => {
    //   console.log('req.cart in backend add: ', req.cart);
    //   return product;
    // })
    // .then(product => console.log('product in add: ', product))
    // .then(product => {
      //if there are no products in cart/no array = req.cart.products, set req.cart.products to an array with that one product.
      // if(!req.cart.products) req.cart.products = [product];
      //otherwise, push this product into the already existing req.cart.products array
      // else req.cart.products.push(product)
      // console.log('req.cart.dataValues in backend add: ', req.cart.dataValues)
      // newProduct = product;
      // req.cart.setProducts([product]) 
    // })
    // .then(associatedProducts => {
    //   console.log('associated products: ', associatedProducts)
    //   // res.json(associatedProducts)
    // })
    // .catch(next)
    // console.log('req.cart in get add: ', req.cart)
    // let associatedOldProducts;
    // req.cart.getProducts()
    //   .then(products => associatedOldProducts = [products])
    //   .catch(next);
    // console.log('associated old products: ', associatedOldProducts)

    
    // req.cart.setProducts([associatedOldProducts, newProduct])
    //   .then(associatedProducts => console.log('associated products: ', associatedProducts))
    //   .catch(next)
    // let associatedNewProducts = await req.cart.setProducts([associatedOldProducts, newProduct]);
    // if (associatedNewProducts) console.log('associated products: ', associatedNewProducts)

})

// TODO:
// if we want to check whether there's a user logged in, then we want to associate the cart with the logged-in user; could also do a findOrCreate -- device portability (a nice-to-have);
