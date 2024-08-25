'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Abouts', [{
      name: '炼金实验室',
      icp: '京ICP备12345678号',
      copyright: '© 2024 Alchemy Lab Inc. All Rights Reserved.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Abouts', null, {});
  }
};
