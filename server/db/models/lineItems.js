const Sequelize = require('sequelize');
const db = require('../db');

const LineItems = db.define('lineItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
        isDecimal: true
    }
  }
});

module.exports = LineItems;
