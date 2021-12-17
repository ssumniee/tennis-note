"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student_day extends Model {
    static associate(models) {
      models.student_day.belongsTo(models.student, {
        foreignKey: { name: "student_id", allowNull: false },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.student_day.belongsTo(models.day, {
        foreignKey: { name: "day_id", allowNull: false },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  student_day.init(
    {
      student_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      day_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "student_day",
      tableName: "student_days",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return student_day;
};
