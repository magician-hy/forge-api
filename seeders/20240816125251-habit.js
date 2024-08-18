'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const habits = [];
    const counts = 100;

    for (let i = 1; i <= counts; i++) {
      const habit = {
        icon: '🔥',
        name: `习惯 ${i}`,
        description: `习惯描述 ${i}`,
        totalCount: i,
        currentCount: i,
        bestCount: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      habits.push(habit);
    }

    await queryInterface.bulkInsert('Habits', habits, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habits', null, {});
  }
};
