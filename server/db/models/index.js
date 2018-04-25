const User = require('./user');
const Category = require('./category');
const Product = require('./product');
const Order = require('./order');
const LineItem = require('./lineItem');
const ProductCategory = require('./productCategory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, { through: LineItem });
Order.belongsToMany(Product, { through: LineItem });
Order.hasMany(LineItem);

module.exports = {
  User,
  Product,
  Category,
  Order, 
  LineItem, 
  ProductCategory
};
