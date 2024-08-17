'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Habit.init({
    logo: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '习惯名称必须存在'
        },
        notEmpty: {
          msg: '习惯名称不能为空'
        },
        len: {
          args: [2, 45],
          msg: '习惯名称长度需要在2 ~ 45个字符之间'
        }
      }
    },
    description: DataTypes.TEXT,
    totalCount: DataTypes.INTEGER,
    currentCount: DataTypes.INTEGER,
    bestCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Habit',
  });
  return Habit;
};