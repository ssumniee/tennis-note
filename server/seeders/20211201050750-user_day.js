"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user_days",
      [
        {
          id: 1,
          user_id: 1,
          day_id: 6,
        },
        {
          id: 2,
          user_id: 2,
          day_id: 6,
        },
        {
          id: 3,
          user_id: 2,
          day_id: 2,
        },
        {
          id: 4,
          user_id: 3,
          day_id: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_days", null, {});
  },
};
