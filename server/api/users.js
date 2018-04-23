'use strict';

const router = require('express').Router();
<<<<<<< HEAD
const { User } = require('../db/models');

=======
const {User, Order} = require('../db/models');
>>>>>>> master
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

<<<<<<< HEAD
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => res.json(user))
  .catch(next);
});
=======
//getting order history
router.get('/:userId/order-history', (req, res, next) => {
  Order.findAll({where: { userId: req.params.userId}})
    .then(orders => res.json(orders))
    .catch(next)
})
>>>>>>> master
