const express = require('express');
const router = express.Router();
const { Habit } = require('../models');

/**
 * 查询习惯列表
 * GET /habits
 */
router.get('/', async function (req, res) {
  try {
    // 定义查询条件
    const condition = {
      order: [['id', 'DESC']],
    };

    // 查询数据
    const habits = await Habit.findAll(condition);

    // 返回查询结果
    res.json({
      status: true,
      message: '查询习惯列表成功',
      data: {
        habits,
      },
    });
  } catch (error) {
    // 返回错误信息
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
        message: '查询习惯失败',
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
    const habit = await Habit.create(req.body);
    res.status(201).json({
      status: true,
      message: '创建习惯成功',
      data: habit,
    })
  } catch (error) {

  }
});

module.exports = router;
