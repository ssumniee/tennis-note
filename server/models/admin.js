"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    static associate(models) {
      // define association here
    }
  }
  admin.init(
    {
      name: { allowNull: false, type: DataTypes.STRING, unique: true },
      password: { allowNull: false, type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "admin",
      tableName: "admins",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return admin;
};
