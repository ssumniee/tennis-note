"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "clubs",
      [
        { id: 1, name: "polygontennis", password: "polygon123", tel: "010-1234-5678", temp: false },
        { id: 2, name: "rocktennis", password: "rock456", tel: "010-5678-1234", temp: false },
        { id: 3, name: "happytennis", password: "happy789", tel: "010-4321-8765", temp: false },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("clubs", null, {});
  },
};
