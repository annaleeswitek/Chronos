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
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    imgUrl: {
        type: Sequelize.STRING
    }
});

Product.hook('beforeCreate', product => {
    if (product.imgUrl === null) product.imgUrl = 'https://dummyimage.com/400x400/e3ffec/000000&text=This+Is+a+Default+Image';
});

module.exports = Product;
