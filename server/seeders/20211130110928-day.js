"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "days",
      [
        { id: 1, name: "월" },
        { id: 2, name: "화" },
        { id: 3, name: "수" },
        { id: 4, name: "목" },
        { id: 5, name: "금" },
        { id: 6, name: "토" },
        { id: 7, name: "일" },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("days", null, {});
  },
};
