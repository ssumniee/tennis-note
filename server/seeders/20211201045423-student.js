"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "students",
      [
        {
          id: 1,
          name: "김수민",
          club_id: 2,
          teacher_id: 1,
          tel: "010-1234-5678",
          start_date: "2021-12-01",
          count: 4,
        },
        {
          id: 2,
          name: "배이슬",
          club_id: 2,
          teacher_id: 1,
          tel: "010-5678-1234",
          start_date: "2021-12-01",
          count: 8,
        },
        {
          id: 3,
          name: "김은총",
          club_id: 3,
          teacher_id: 2,
          tel: "010-4321-8765",
          start_date: "2021-12-01",
          count: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("students", null, {});
  },
};
