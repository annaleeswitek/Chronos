import Sequelize from 'sequelize';
import db from '../db';


const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});


module.exports = Category;