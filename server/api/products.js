const router = require('express').Router();
const {Product} = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
    Product.findAll({
        include: [{ all: true }] // as we continue might not be what we want (thinking orders / cart) -- KHWB
    })
    .then( products => res.json(products) )
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then( product => res.json(product) )
    .catch(next);
});

//adding new product - admin
// HAVE to have validation on the back if you want to be secure -- KHWB

router.post('/', (req, res, next) => { // pull me out and reuse me in other places. Maybe put me in a utils file -- KHWB
    if (!req.user) // throw 401 -- unauthorized
    if (!req.user.isAdmin) // throw 403 -- forbidden
    next()
}, (req, res, next) => {
    Product.findOrCreate({ // create(req.body)
        where: {
            title: req.body.title, 
            price: req.body.price, 
            imgUrl: req.body.imgUrl, 
            description: req.body.description
        }
    })
    .then(([newProduct, wasCreatedBool]) => {
        res.json(newProduct) // would expect without brackets for consistency as above -- KHWB
    })
    .catch(next)
})

// editing product - admin
router.put('/:productId', (req, res, next) => {
    Product.update({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        imgUrl: req.body.imgUrl
        
    } // consider req.body instead -- KHWB

    , {
        where: {id: req.params.productId}, 
        returning: true, 
        plain: true
    }
    )
    .then(([numOfAffected, updatedProduct]) => {
        console.log('updated campus:', updatedProduct)
        res.json(updatedProduct);
    })
    .catch(next);
})
