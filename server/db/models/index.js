const User = require('./user');
const Category = require('./category');
const Product = require('./product');
const Order = require('./order');
const LineItems = require('./lineItems');
const ProductCategory = require('./productCategory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Product.belongsToMany(Category, {through: {
   model: ProductCategory, 
   unique: false, 
   scope: {
     categorizeable: 'product'
   }
 },
 foreignKey: 'categorizeable_id', 
 constraints: false
});

 Category.belongsToMany(Product, {
   through: {
    model: ProductCategory, 
    unique: false
   },
   foreignKey: 'category_id', 
   constraints: false
 });

 User.hasMany(Order);
 Order.belongsTo(User);

 Product.belongsToMany(Order, { through: LineItems });
 Order.belongsToMany(Product, { through: LineItems });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Order, 
  LineItems
};
