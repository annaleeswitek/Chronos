const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('active', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = Order;
