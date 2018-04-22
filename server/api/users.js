const router = require('express').Router();
const {User, Order} = require('../db/models');
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

//getting order history
router.get('/:userId/order-history', (req, res, next) => {
  Order.findAll({where: { userId: req.params.userId}})
    .then(orders => res.json(orders))
    .catch(next)
})
