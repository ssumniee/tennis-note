"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class court extends Model {
    static associate(models) {
      models.court.belongsTo(models.club, {
        foreignKey: { name: "club_id", allowNull: false },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  court.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      club_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "court",
      tableName: "courts",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return court;
};
