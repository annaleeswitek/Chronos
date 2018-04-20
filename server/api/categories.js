const router = require('express').Router();
const { Category, Product } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Category.findAll()
    .then( categories => res.json(categories) )
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id, {
    include: [{model: Product}]
  })
  .then(theCategory => res.json(theCategory))
  .catch(next);
});
