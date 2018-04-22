const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory = db.define('product_category', {
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  category_id: {
    type: Sequelize.INTEGER, 
    unique: 'product_category_categorizeable'
  }, 
  categorizeable: {
    type: Sequelize.STRING, 
    unique: 'product_category_categorizeable'
  }, 
  categorizeable_id: {
    type: Sequelize.INTEGER, 
    unique: 'product_category_categorizeable', 
    references: null
  }
});

module.exports = ProductCategory;