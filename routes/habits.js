const express = require('express');
const router = express.Router();
const { Habit } = require('../models');
const { Op } = require('sequelize');

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
    res.json({
      status: true,
      message: '查询习惯列表成功',
      data: {
        habits: rows,
        pagination: {
          total: count,
          currentPage,
          pageSize,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: '查询习惯列表失败',
      errors: [error.message],
    });
  }
});

/**
 * 查询习惯详情
 * GET /habits/:id
  */
router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const habit = await Habit.findByPk(id);
    if (habit) {
      res.json({
        status: true,
        message: '查询习惯成功',
        data: habit,
      });
    } else {
      res.status(404).json({
        status: false,
        message: '未找到习惯',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: '查询习惯失败',
      errors: [error.message],
    });
  }
});

/**
 * 创建习惯
 * POST /habits
 */
router.post('/', async function (req, res) {
  try {
    const body = filterBody(req.body);
    const habit = await Habit.create(body);
    res.status(201).json({
      status: true,
      message: '创建习惯成功',
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: '创建习惯失败',
      errors: [error.message],
    });
  }
});

/**
 * 更新习惯
 * PUT /habits/:id
 */
router.put('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const habit = await Habit.findByPk(id);
    const body = filterBody(req.body);
    if (habit) {
      await habit.update(body);
      res.json({
        status: true,
        message: '更新习惯成功',
        data: habit,
      })
    } else {
      res.status(404).json({
        status: false,
        message: '未找到习惯',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: '更新习惯失败',
      errors: [error.message],
    });
  }
});

/**
 * 删除习惯
 * DELETE /habits/:id
  */
router.delete('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const habit = await Habit.findByPk(id);
    if (habit) {
      await habit.destroy();
      res.json({
        status: true,
        message: '删除习惯成功',
      });
    } else {
      res.status(404).json({
        status: false,
        message: '未找到习惯',
      });
    }
  } catch {
    res.status(500).json({
      status: false,
      message: '删除习惯失败',
      errors: [error.message],
    });
  }
});

/**
 * 公共方法：白名单过滤
 * @param req
 * @returns
 */
const filterBody = (req) => {
  return {
    logo: req.body.logo,
    name: req.body.name,
    description: req.body.description,
  };
}

module.exports = router;
