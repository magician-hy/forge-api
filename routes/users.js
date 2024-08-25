const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Op } = require('sequelize');
const { NotFoundError, success, failure } = require('../utils/response');

/**
 * 查询用户列表
 * GET /users
 */
router.get('/', async function (req, res) {
  try {
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;
    const condition = {
      order: [['id', 'DESC']],
      offset,
      limit: pageSize,
    };

    if (query.username) {
      condition.where = {
        username: {
          [Op.like]: `%${query.username}%`
        }
      };
    }

    if (query.email) {
      condition.where = {
        email: {
          [Op.eq]: query.email
        }
      };
    }

    if (query.telephone) {
      condition.where = {
        telephone: {
          [Op.eq]: query.telephone
        }
      };
    }

    if (query.role) {
      condition.where = {
        role: {
          [Op.eq]: query.role
        }
      };
    }

    const { count, rows } = await User.findAndCountAll(condition);
    success(res, '查询用户列表成功', {
      users: rows,
      pagination: {
        total: count,
        currentPage,
        pageSize,
      },
    });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 查询用户详情
 * GET /users/:id
  */
router.get('/:id', async function (req, res) {
  try {
    const user = await getUser(req);
    success(res, '查询用户成功', user);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 创建用户
 * POST /users
 */
router.post('/', async function (req, res) {
  try {
    const body = filterBody(req);
    const user = await User.create(body);
    success(res, '创建用户成功', user, 201);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 更新用户
 * PUT /users/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const user = await getUser(req);
    const body = filterBody(req);
    await user.update(body);
    success(res, '更新用户成功', user);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：白名单过滤
 * @param req
 * @returns {{password, role: (number|string|*), introduce: ({type: *}|*), sex: ({allowNull: boolean, type: *, validate: {notNull: {msg: string}, notEmpty: {msg: string}, isIn: {args: [number[]], msg: string}}}|{defaultValue: number, allowNull: boolean, type: *}|*), nickname: (string|*), company: ({type: *}|*), avatar: ({type: *, validate: {isUrl: {msg: string}}}|*), email: (string|*), username}}
 */
function filterBody(req) {
  return {
    avatar: req.body.avatar,
    username: req.body.username,
    email: req.body.email,
    telephone: req.body.telephone,
    password: req.body.password,
    role: req.body.role,
  };
}

/**
 * 公共方法：查询当前用户
 */
const getUser = async (req) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError(`ID: ${id} 的用户未找到`);
  }
  return user;
}

module.exports = router;
