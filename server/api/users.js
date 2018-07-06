'use strict';

const router = require('express').Router();
const { User, Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    const users = await User.findAll({ attributes: ['id', 'email'] })
    if (!users) res.sendStatus(404)
    res.json(users)
  } catch (err) {
    next(err)
  }

});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) res.sendStatus(404)
    res.json(user)
  } catch (err) {
    next(err)
  }

});

router.get('/:userId/order-history', async (req, res, next) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.userId}})
    if (!orders) res.sendStatus(404)
    res.json(orders)
  } catch (err) {
    next(err)
  }
});

