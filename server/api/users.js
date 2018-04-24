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
  User.findOne({ where: { id: req.params.userId }}, {include: [{ model: Order }]})
  .then(user => {
    console.log('this is the stuff: ', user.orders)
    res.json(user.orders)
  })
  .catch(next);
});

