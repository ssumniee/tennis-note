"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teacher extends Model {
    static associate(models) {
      models.teacher.belongsTo(models.club, {
        foreignKey: { name: "club_id", allowNull: false },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.teacher.belongsTo(models.court, {
        foreignKey: { name: "court_id" },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.teacher.hasMany(models.student, {
        foreignKey: "teacher_id",
        targetKey: "id",
      });
    }
  }
  teacher.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      club_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      court_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "teacher",
      tableName: "teachers",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return teacher;
};
