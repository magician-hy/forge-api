const express = require('express');
const router = express.Router();
const { Habit } = require('../models');
const { Op } = require('sequelize');
const { NotFoundError, success, failure } = require('../utils/response');

/**
 * 查询习惯列表
 * GET /habits
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
    // 模糊搜索
    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${query.name}%`,
        }
      }
    }
    const { count, rows } = await Habit.findAndCountAll(condition);
    success(res, '查询习惯列表成功', {
      habits: rows,
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
 * 查询习惯详情
 * GET /habits/:id
  */
router.get('/:id', async function (req, res) {
  try {
    const habit = await getHabit(req);
    success(res, '查询习惯成功', habit);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 创建习惯
 * POST /habits
 */
router.post('/', async function (req, res) {
  try {
    const body = filterBody(req);
    const habit = await Habit.create(body);
    success(res, '创建习惯成功', habit, 201);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 更新习惯
 * PUT /habits/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const habit = await getHabit(req);
    const body = filterBody(req);
    await habit.update(body);
    success(res, '更新习惯成功', habit);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 删除习惯
 * DELETE /habits/:id
  */
router.delete('/:id', async function (req, res) {
  try {
    const habit = await getHabit(req);
    await habit.destroy();
    success(res, '删除习惯成功');
  } catch {
    failure(res, error);
  }
});

/**
 * 公共方法：白名单过滤
 * @param req
 * @returns
 */
const filterBody = (req) => {
  return {
    icon: req.body.icon,
    name: req.body.name,
    description: req.body.description,
  };
}

/**
 * 公共方法：查询当前习惯
 */
const getHabit = async (req) => {
  const { id } = req.params;
  const habit = await Habit.findByPk(id);
  if (!habit) {
    throw new NotFoundError(`ID: ${id} 的习惯未找到`);
  }
  return habit;
}

module.exports = router;
