const db = require('./db');

// register models
const models = require('./models');

module.exports = {
  db,
  User: models.User,
  Product: models.Product,
  Category: models.Category, 
  Order: models.Order, 
  LineItem: models.LineItem,
  ProductCategory: models.ProductCategory
}
