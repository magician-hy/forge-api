'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: '图片地址不正确' },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '用户名必须填写' },
        notEmpty: { msg: '用户名不能为空' },
        len: { args: [2, 45], msg: '用户名长度必须是2 ~ 45之间' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '邮箱必须填写' },
        notEmpty: { msg: '邮箱不能为空' },
        isEmail: { msg: '邮箱格式不正确' },
        async isUnique(value) {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            throw new Error('邮箱已存在，请直接登录');
          }
        },
      },
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: '手机号必须填写。' },
        notEmpty: { msg: '手机号不能为空。' },
        is: { args: /^1[3456789]\d{9}$/, msg: '手机号格式不正确。' },
        async isUnique(value) {
          const user = await User.findOne({ where: { telephone: value } });
          if (user) {
            throw new Error('手机号已存在，请直接登录。');
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // 检查是否为空
        if (!value) {
          throw new Error('密码必须填写。');
        }

        // 检查长度
        if (value.length < 6 || value.length > 45) {
          throw new Error('密码长度必须是6 ~ 45之间。');
        }

        // 如果通过所有验证，进行hash处理并设置值
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    role: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: '用户类型必须选择。' },
        notEmpty: { msg: '用户类型不能为空。' },
        isIn: { args: [[0, 1]], msg: '用户类型的值必须是，普通用户：0 会员用户：1' }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};