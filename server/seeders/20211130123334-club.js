"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "clubs",
      [
        {
          id: 1,
          name: "admin1",
          password: "tenn!sN0te",
          temp: false,
          is_admin: true,
        },
        {
          id: 2,
          name: "polygontennis",
          password: "polygon123",
          tel: "010-1234-5678",
          temp: false,
          is_admin: false,
        },
        {
          id: 3,
          name: "rocktennis",
          password: "rock456",
          tel: "010-5678-1234",
          temp: false,
          is_admin: false,
        },
        {
          id: 4,
          name: "happytennis",
          password: "happy789",
          temp: true,
          is_admin: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("clubs", null, {});
  },
};
