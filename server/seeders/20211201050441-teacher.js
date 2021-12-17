"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "teachers",
      [
        {
          id: 1,
          name: "김철수",
          club_id: 2,
          court_id: 1,
        },
        {
          id: 2,
          name: "홍길동",
          club_id: 3,
          court_id: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("teachers", null, {});
  },
};
