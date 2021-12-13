"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "student_days",
      [
        {
          id: 1,
          student_id: 1,
          day_id: 6,
        },
        {
          id: 2,
          student_id: 2,
          day_id: 6,
        },
        {
          id: 3,
          student_id: 2,
          day_id: 2,
        },
        {
          id: 4,
          student_id: 3,
          day_id: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("student_days", null, {});
  },
};
