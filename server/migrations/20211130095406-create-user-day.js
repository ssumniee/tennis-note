"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_days", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",
        // references: {
        //   model: {
        //     tableName: "users",
        //     schema: "",
        //   },
        //   key: "id",
        // },
      },
      day_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",
        // references: {
        //   model: {
        //     tableName: "days",
        //     schema: "",
        //   },
        //   key: "id",
        // },
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_days");
  },
};
