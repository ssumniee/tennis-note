"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "club_days",
      [
        {
          id: 1,
          club_id: 1,
          dayoff_id: 7,
        },
        {
          id: 2,
          club_id: 2,
          dayoff_id: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("club_days", null, {});
  },
};
