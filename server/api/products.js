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
    // const categories = categoryNames.map(async categoryName => {
    //     const [category] = await Category.findOrCreate({
    //         where: { productId: }
    //     })
    // })
    // const [productCategory, wasCreated] = await ProductCategory.findOrCreate({
    //     where: { productId: req.para}
    // })
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
