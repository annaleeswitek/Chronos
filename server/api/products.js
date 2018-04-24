'use strict';

const router = require('express').Router();
const { Product, Category, ProductCategory } = require('../db/models');

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
    .then( product => res.json(product))
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
    //create new product
    let newProduct = await Product.create(req.body).catch(next);
    //create or find categor(y)(ies) 
    //the following returns an array of arrays [[category, bool], [category, bool]...[category, bool]]
    const categoryPromiseArrays = categoryNames.map(async categoryName => await Category.findOrCreate({ 
        where: { name: categoryName }
    }).catch(next))
    console.log('category promise arrays: ', categoryPromiseArrays);
    const categoryArrays = await Promise.all(categoryPromiseArrays);
    console.log('category arrays: ', categoryArrays);
    const categories = categoryArrays.map(categoryArray => categoryArray[0]);
    console.log('categories in backend: ', categories)
    //create ProductCategory instance
    if (categories) categories.map(async category => 
        await ProductCategory.create({
             productId: newProduct.id, 
             categoryId: category.id 
            })
            .catch(next));
   
    res.json(newProduct);
})

// editing product - admin
router.put('/:productId', (req, res, next) => {
    Product.update(req.body, {
        where: {id: req.params.productId},
        returning: true,
        plain: true
    })
    .then(([numOfAffected, updatedProduct]) => res.json(updatedProduct))
    .catch(next);
});
