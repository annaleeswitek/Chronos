'use strict';

const router = require('express').Router();
const { User, Order } = require('../db/models');

module.exports = router;


// this route is for admins to see pending orders
router.get('/order-history/pending', async (req, res, next) => {
  const pendingOrders = await Order.findAll({ 
    where: { status: 'pending' },
    include: [{model: User}]
  }).catch(next);


  res.json(pendingOrders);
});

