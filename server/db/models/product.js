const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    description: {
        type: Sequelize.TEXT
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    imgUrl: {
        type: Sequelize.STRING
    }
});

module.exports = Product;
