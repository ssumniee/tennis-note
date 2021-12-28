"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // students table
    await queryInterface.removeColumn("students", "repayNotiSent");
    await queryInterface.addColumn("students", "repaySMS_sent", {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.removeColumn("students", "createdAt");
    await queryInterface.addColumn("students", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("students", "updatedAt");
    await queryInterface.addColumn("students", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // clubs table
    await queryInterface.removeColumn("clubs", "createdAt");
    await queryInterface.addColumn("clubs", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("clubs", "updatedAt");
    await queryInterface.addColumn("clubs", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // clubs table
    await queryInterface.removeColumn("clubs", "createdAt");
    await queryInterface.addColumn("clubs", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("clubs", "updatedAt");
    await queryInterface.addColumn("clubs", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // teachers table
    await queryInterface.removeColumn("teachers", "createdAt");
    await queryInterface.addColumn("teachers", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("teachers", "updatedAt");
    await queryInterface.addColumn("teachers", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // days table
    await queryInterface.removeColumn("days", "createdAt");
    await queryInterface.addColumn("days", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("days", "updatedAt");
    await queryInterface.addColumn("days", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // student_days table
    await queryInterface.removeColumn("student_days", "createdAt");
    await queryInterface.addColumn("student_days", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("student_days", "updatedAt");
    await queryInterface.addColumn("student_days", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // club_days table
    await queryInterface.removeColumn("club_days", "createdAt");
    await queryInterface.addColumn("club_days", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("club_days", "updatedAt");
    await queryInterface.addColumn("club_days", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // courts table
    await queryInterface.removeColumn("courts", "createdAt");
    await queryInterface.addColumn("courts", "created_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("courts", "updatedAt");
    await queryInterface.addColumn("courts", "updated_at", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // students table
    await queryInterface.removeColumn("students", "repaySMS_sent");
    await queryInterface.addColumn("students", "repayNotiSent", {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.removeColumn("students", "created_at");
    await queryInterface.addColumn("students", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("students", "updated_at");
    await queryInterface.addColumn("students", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // clubs table
    await queryInterface.removeColumn("clubs", "created_at");
    await queryInterface.addColumn("clubs", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("clubs", "updated_at");
    await queryInterface.addColumn("clubs", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // clubs table
    await queryInterface.removeColumn("clubs", "created_at");
    await queryInterface.addColumn("clubs", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("clubs", "updated_at");
    await queryInterface.addColumn("clubs", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // teachers table
    await queryInterface.removeColumn("teachers", "created_at");
    await queryInterface.addColumn("teachers", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("teachers", "updated_at");
    await queryInterface.addColumn("teachers", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // days table
    await queryInterface.removeColumn("days", "created_at");
    await queryInterface.addColumn("days", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("days", "updated_at");
    await queryInterface.addColumn("days", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // student_days table
    await queryInterface.removeColumn("student_days", "created_at");
    await queryInterface.addColumn("student_days", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("student_days", "updated_at");
    await queryInterface.addColumn("student_days", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // club_days table
    await queryInterface.removeColumn("club_days", "created_at");
    await queryInterface.addColumn("club_days", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("club_days", "updated_at");
    await queryInterface.addColumn("club_days", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    // courts table
    await queryInterface.removeColumn("courts", "created_at");
    await queryInterface.addColumn("courts", "createdAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
    await queryInterface.removeColumn("courts", "updated_at");
    await queryInterface.addColumn("courts", "updatedAt", {
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
      type: Sequelize.DATE,
    });
  },
};
