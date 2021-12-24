"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class club extends Model {
    static associate(models) {
      models.club.hasMany(models.student, {
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
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      clubname: {
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tel: {
        type: DataTypes.STRING,
      },
      temp: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
