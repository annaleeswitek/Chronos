'use strict';

const router = require('express').Router();
<<<<<<< HEAD
const { Product } = require('../db/models');
=======
const { Product, Category } = require('../db/models');
>>>>>>> master

module.exports = router;

router.get('/', (req, res, next) => {
    Product.findAll({
        include: [{ all: true }]
    })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
<<<<<<< HEAD
    .then(product => res.json(product))
=======
    .then( product => res.json(product))
>>>>>>> master
    .catch(next);
});

//adding new product - admin
// router.post('/', (req, res, next) => {
//     Product.create(req.body)
//     .then(newProduct => {
//         res.json(newProduct);
//     })
//     .catch(next);
// });

router.post('/', async (req, res, next) => {
    console.log('req.body.categories', req.body.categories);
    const categoryNames = req.body.categories.split(', ');
    console.log('categoryNames', categoryNames)
    // const newProduct = await Product.create(req.body).catch(next);
    const productCategoryPromises = categoryNames.map(categoryName => {
        return Category.findOrCreate({where: { name: categoryName }})
    })
<<<<<<< HEAD
    .then(newProduct => res.json(newProduct))
=======
    console.log('product category promises in back end: ', productCategoryPromises)
    // let productCategoriesArray = [];
    let categoriesArrays = await Promise.all(productCategoryPromises).catch(next);
    console.log('categories arrays: ', categoriesArrays);
    let productCategoriesArray = categoriesArrays.map(categoryArray => categoryArray);
    console.log('produce categories array: ', productCategoriesArray);
    let productCategories = productCategoriesArray.map(productCategory => productCategory[0].dataValues);
    console.log('product categories: ', productCategories);
    let newProduct = await Product.create({
        title: req.body.title, 
        price: req.body.price, 
        description: req.body.description, 
        quantity: req.body.quantity, 
        imgUrl: req.body.imgUrl, 
        categories: productCategories
    })
>>>>>>> master
    .catch(next);
    res.json(newProduct);
})

// editing product - admin
router.put('/:productId', (req, res, next) => {
    const productId = +req.params.id;
    Product.update(req.body, {
        where: {id: productId,
        returning: true
    }})
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next);
});
