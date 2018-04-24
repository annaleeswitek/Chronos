'use strict';

const router = require('express').Router();
const { User, Order } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll()
  .then(orders => {
    res.json(orders);
  })
  .catch(next);
});

// this route is for admins to see pending orders
router.get('/order-history/pending', async (req, res, next) => {
  const pendingOrders = await Order.findAll({ 
    where: { status: 'pending' },
    include: [{model: User}]
  }).catch(next);
  console.log('pending order in back: ', pendingOrders);
  const users = await User.findAll().catch(next);
  console.log('users in back: ', users);
  // const pendingOrdersWithUsers = pendingOrders.map(pendingOrder => 
  //   users.forEach(user => )
  // )
  // 
  // const pendingOrdersWithUsers = users.map(user =>
  //     pendingOrders.forEach(pendingOrder => {
  //       console.log('current user: ', user);
  //       if (pendingOrder.userId === user.id) pendingOrder.dataValues.userEmail = user.email;
  // })
  // );
  // const filteredUsers = users.filter(user => )
  // const pendingOrdersWithUsers = pendingOrders.map(order => {
  //   order.dataValues.userEmail = 
  // })
  console.log('pending order with users? ', pendingOrders);
  res.json(pendingOrders);
});

