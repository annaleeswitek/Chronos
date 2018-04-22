const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'completed', 'pending', 'cancelled'),
    allowNull: false,
    defaultValue: 'cart'
  }
});

//pending means that the user has checked out but order has not been shipped
module.exports = Order;
