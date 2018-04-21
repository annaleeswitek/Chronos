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
router.post('/', async (req, res, next) => {
    let newProduct = await Product.create({
        title: 'new', 
        price: 0.00, 
        description: '',
        quantity: 0, 
        imgUrl: ''

    })
    .catch(err => console.error(err));
    // console.log('newProduct: ', newProduct)
    const categoriesFromForm = 'nostalgia, money'
    const categories = categoriesFromForm.split(', '); //this returns an array of strings
    const createdOrFoundCategoryPromises = categories.map(categoryName => {
        return Category.findOrCreate({ where: { name: categoryName }} )
            .then(([category, wasCreatedBool]) => category )
            .catch(err => console.error(err))
    })
    console.log('category promises: ', createdOrFoundCategoryPromises)
    let createdOrFoundCategories = [];
    let tempCategories = [];
    return Promise.all(createdOrFoundCategoryPromises)
            .then(categoryArray => {
            categoryArray.forEach(category => createdOrFoundCategories.push(category.dataValues)) //these are the category instances!
            return createdOrFoundCategories; //this returns an array of category instances
        })
        .then(createdOrFoundCategories => {

           newProduct.setCategories(createdOrFoundCategories)
        })
        then(() => res.json(newProduct))
        .catch(err => console.error(err));
    

   
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
