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
    .then( product => res.json(product) )
    .catch(next);
});

//adding new product - admin
router.post('/', (req, res, next) => {
    const categoryNames = ['nostalgia', 'future'];
    const categoryPromises = categoryNames.map(name => Category.findOrCreate({ where: { name: name }}));
    // console.log('categoryPromises: ', categoryPromises);
    return Promise.all(categoryPromises)
            .then(categories => console.log('categories: ', categories))
            // .then(categories => categories.forEach(category => console.log('category: ', category.dataValues)))
            .catch(err => console.error(err));
    
    // Product.create(req.body)
    // .then(newProduct => res.json(newProduct))
    // .catch(next);
});

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
