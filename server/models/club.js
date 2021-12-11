"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class club extends Model {
    static associate(models) {
      models.club.hasMany(models.user, {
        foreignKey: "club_id",
        targetKey: "id",
      });
      models.club.hasMany(models.teacher, {
        foreignKey: "club_id",
        targetKey: "id",
      });
    }
  }
  club.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tel: {
        type: DataTypes.STRING,
      },
      temp: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "club",
      tableName: "clubs",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return club;
};
