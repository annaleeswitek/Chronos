const User = require('./user');
const Category = require('./category');
const Product = require('./product');
const Order = require('./order');
const LineItems = require('./lineItems');

 Product.belongsToMany(Category, {through: 'product_category'});
 Category.belongsToMany(Product, {through: 'product_category'});

 User.hasMany(Order);
 Order.belongsTo(User);

 Product.belongsToMany(Order, { through: LineItems });
 Order.belongsToMany(Product, { through: LineItems });

module.exports = {
  User,
  Product,
  Category,
  Order
};
