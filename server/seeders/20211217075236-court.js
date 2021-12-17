"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "courts",
      [
        {
          id: 1,
          name: "A",
          club_id: 2,
        },
        {
          id: 2,
          name: "B",
          club_id: 2,
        },
        {
          id: 3,
          name: "A",
          club_id: 3,
        },
        {
          id: 4,
          name: "B",
          club_id: 3,
        },
        {
          id: 5,
          name: "C",
          club_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("courts", null, {});
  },
};
