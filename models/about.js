'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class About extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  About.init({
    name: DataTypes.STRING,
    icp: DataTypes.STRING,
    copyright: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'About',
  });
  return About;
};