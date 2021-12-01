"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class day extends Model {
    static associate(models) {
      models.day.hasMany(models.user_day, {
        foreignKey: "day_id",
        targetKey: "id",
      });
    }
  }
  day.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "day",
      tableName: "days",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return day;
};
