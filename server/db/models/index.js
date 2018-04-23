const User = require('./user');
const Category = require('./category');
const Product = require('./product');
const Order = require('./order');
const LineItems = require('./lineItems');
// const ProductCategory = require('./productCategory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.hasMany(Category, { as: 'categories'});
Category.belongsToMany(Product, { through: 'product_categories'})
// Category.belongsToMany(Product, {
//   through: {
//     model: ProductCategory, 
//     unique: false
//   },
//   foreignKey: 'category_id', 
//   constraints: false
// });

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, { through: LineItems });
Order.belongsToMany(Product, { through: LineItems });
Order.hasMany(LineItems)

module.exports = {
  User,
  Product,
  Category,
  Order, 
  LineItems
};
