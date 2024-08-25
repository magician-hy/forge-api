const express = require('express');
const router = express.Router();
const { About } = require('../models');
const { NotFoundError, success, failure } = require('../utils/response');

/**
 * 查询关于信息
 * GET /about
  */
router.get('/', async function (req, res) {
  try {
    const about = await getAbout();
    success(res, '查询关于信息成功', about);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 更新关于信息
 * PUT /about
 */
router.put('/', async function (req, res) {
  try {
    const about = await getAbout();
    const body = filterBody(req);
    await about.update(body);
    success(res, '更新关于信息成功', about);
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：白名单过滤
 * @param req
 * @returns {{copyright: (string|*), icp: (string|string|DocumentFragment|*), name}}
 */
function filterBody(req) {
  return {
    name: req.body.name,
    icp: req.body.icp,
    copyright: req.body.copyright
  };
}

/**
 * 公共方法：查询当前系统设置
 */
const getAbout = async () => {
  const about = await About.findOne();
  if (!about) {
    throw new NotFoundError('初始系统设置未找到，请运行种子文件');
  }
  return about;
}

module.exports = router;
