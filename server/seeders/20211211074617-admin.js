"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("admins", [
      {
        id: 1,
        name: "admin1",
        password: "tenn!sN0te",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("admins", null, {});
  },
};
