"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    static associate(models) {
      models.student.belongsTo(models.club, {
        foreignKey: { name: "club_id", allowNull: true },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.student.belongsTo(models.teacher, {
        foreignKey: { name: "teacher_id", allowNull: true },
        targetKey: "id",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      models.student.hasMany(models.student_day, {
        foreignKey: "student_id",
        targetKey: "id",
      });
    }
  }
  student.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      club_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
      },
      tel: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      count: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "student",
      tableName: "students",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return student;
};
