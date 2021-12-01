"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      club_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",
        // references: {
        //   model: {
        //     tableName: "clubs",
        //     schema: "",
        //   },
        //   key: "id",
        // },
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",
        // references: {
        //   model: {
        //     tableName: "teachers",
        //     schema: "",
        //   },
        //   key: "id",
        // },
      },
      tel: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATEONLY,
      },
      end_date: {
        type: Sequelize.DATEONLY,
      },
      count: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("users");
  },
};
