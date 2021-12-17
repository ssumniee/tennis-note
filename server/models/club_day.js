"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class club_day extends Model {
    static associate(models) {
      models.club_day.belongsTo(models.club, {
        foreignKey: { name: "club_id", allowNull: true },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.club_day.belongsTo(models.day, {
        foreignKey: { name: "dayoff_id", allowNull: true },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  club_day.init(
    {
      club_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      dayoff_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "club_day",
      tableName: "club_days",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return club_day;
};
