const router = require('express').Router();
const {Product, Category} = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
    Product.findAll({
        include: [{ all: true }]
    })
    .then( products => res.json(products) )
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(function(product) {
        console.log(product.getCategories().then(categories => console.log('product categories: ', categories)))
        return res.json(product) 
    })
    .catch(next);
});


//adding new product - admin
/* 
1. find or create entered categories
2. set categories on product
*/
router.post('/', (req, res, next) => {
    const categories = req.body.categories.split(', '); //this returns an array of strings
    const createdOrFoundCategoryPromises = categories.map(categoryName => {
        return Category.findOrCreate({ where: { name: categoryName }} )
            .then(([category, wasCreatedBool]) => category )
            .catch(err => console.error(err))
    })
    // //at this point, I have an array of category instances...right? --> nope it's an array of promises, need to pull off categories
    console.log('categoryPromises: ', createdOrFoundCategoryPromises);
    let createdOrFoundCategories = [];
    let tempCategories;
    return Promise.all(createdOrFoundCategoryPromises)
        .then(categoryArray => {
            categoryArray.forEach(category => createdOrFoundCategories.push(category.dataValues)) //these are the category instances!
            return createdOrFoundCategories; //this returns an array of category instances
        })
        .then(createdOrFoundCategories => {
            tempCategories = createdOrFoundCategories;
            return Product.create(req.body)
        }) 
        .then(newProduct => {
            console.log('new product: ', newProduct)
            // res.json(newProduct)
            // return newProduct.setCategories(tempCategories);
         })
        .catch(err => console.error(err))

    // console.log('categories outside promise chain: ', createdOrFoundCategories)
    // Product.create(req.body)
    // .then( newProduct => {
    //    return newProduct.setCategories(createdOrFoundCategories);
    // })
    // .then(newProduct => res.json(newProduct))
    // .catch(next);
})

// editing product - admin
router.put('/:productId', (req, res, next) => {
    Product.update(req.body, {
        where: {id: req.params.productId},
        returning: true,
        plain: true
    }
    )
    .then(([numOfAffected, updatedProduct]) => {
        res.json(updatedProduct);
    })
    .catch(next);
});
