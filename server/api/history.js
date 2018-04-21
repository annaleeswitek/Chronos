'use strict';

const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

// router.get('/', (req, res, next) => {
//   Order.findAll({
//     include: [{ all: true }]
//   })
//   .then(orders => res.json(orders))
//   .catch(next);
// });

// router.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.orderId)
//   .then(order => res.json(order))
//   .catch(next);
// });

// router.put('/:orderId', (req, res, next) => {
//   Order.update(req.body, {
//     where: { id: req.params.orderId }, 
//     returning: true
//   })
//   .then(updatedOrder => res.json(updatedOrder))
//   .catch(next);
// });

router.get('/users/:userId/history', (req, res, next) => {
  User.getOrders()
  .then(orders => res.json(orders))
  .catch(next);
});