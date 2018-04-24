'use strict';

const router = require('express').Router();
const { User, Order } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => res.json(user))
  .catch(next);
});

router.get('/:userId/order-history', (req, res, next) => {
  Order.findAll({ where: { userId: req.params.userId }})
  .then(orders => {
    console.log('this is the stuff: ', orders);
    res.json(orders);
  })
  .catch(next);
});

// this route is for admins to see pending orders
router.get('/:userId/order-history/pending', (req, res, next) => {
  Order.findAll({ where: { userId: req.params.userId, status: 'pending' }})
  .then(orders => {
    console.log('this is the stuff: ', orders);
    res.json(orders);
  })
  .catch(next);
});
