'use strict';
const router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));

router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  next();
});

module.exports = router;
