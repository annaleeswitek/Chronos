const router = require('express').Router();
const {Category, Product} = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Category.findAll()
    .then( categories => res.json(categories) )
    .catch(next);
});

// router.get('/:id', (req, res, next) => {
//   Category.findById(req.params.id)
//     .then(theCategory => theCategory.getProducts())
//     .then(products => res.json(products))
//     .catch(next);
// });

router.get('/:id', (req, res, next) => {
  // backend filtering --> you don't have the overhead of all products on your frontend -- KHWB
  // you still have a decent amount of overhead
    // next step -- pagination --> you give a token for which products you sent, so you only send a reasonable chunk of info at a time
    // our e-commerce won't have millions of products so this is perfect for our use case
  Category.findOne({ // findById(id, {include:[]}) -- KHWB
    where: {
      id: req.params.id
    },
    include: [{model: Product}]
  })
  .then(theCategory => res.json(theCategory))
  .catch(next);
});

// clean me in master -- KHWB
// router.get('/:id', (req, res, next) => {
//   Category.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [{model: Category}]
//   })
//     .then(theCategory => theCategory.getProducts())
//     .then(products => res.json(products))
//     .catch(next);
// });
