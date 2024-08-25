'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        avatar: 'https://s3-imfile.feishucdn.com/static-resource/v1/v3_00cm_be247dcc-b57e-4d2c-a658-e2f9e91951eg~?image_size=noop&cut_type=&quality=&format=image&sticker_format=.webp',
        username: 'vip',
        telephone: '13712345678',
        email: 'vip@forge.cn',
        password: bcrypt.hashSync('123456789', 10),
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://s3-imfile.feishucdn.com/static-resource/v1/v3_00cm_be247dcc-b57e-4d2c-a658-e2f9e91951eg~?image_size=noop&cut_type=&quality=&format=image&sticker_format=.webp',
        username: 'normal',
        telephone: '13712345679',
        email: 'normal@forge.cn',
        password: bcrypt.hashSync('123456789', 10),
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
