'use strict';

const Sequelize = require('sequelize');
const Product = require('./product');
const db  = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'completed', 'pending', 'cancelled'),
    allowNull: false,
    defaultValue: 'cart'
  }, 
}, {
  defaultScope: {
    include: Product
  }
});

//pending means that the user has checked out but order has not been shipped

module.exports = Order;
