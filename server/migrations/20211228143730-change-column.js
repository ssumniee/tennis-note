"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "repayNotiSent");
    await queryInterface.addColumn("students", "repaySMS_sent", {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "repaySMS_sent");
    await queryInterface.addColumn("students", "repayNotiSent", {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    });
  },
};
