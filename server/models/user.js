"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.belongsTo(models.club, {
        foreignKey: { name: "club_id", allowNull: true },
        targetKey: "id",
        onDelete: "CASCADE",
      });
      models.user.belongsTo(models.teacher, {
        foreignKey: { name: "teacher_id", allowNull: true },
        targetKey: "id",
        onDelete: "SET NULL",
      });
      models.user.hasMany(models.user_day, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  user.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      club_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        //   onDelete: "CASCADE",
        //   references: {
        //     model: {
        //       tableName: "clubs",
        //       schema: "",
        //     },
        //     key: "id",
        //   },
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        //   onDelete: "CASCADE",
        //   references: {
        //     model: {
        //       tableName: "teachers",
        //       schema: "",
        //     },
        //     key: "id",
        //   },
      },
      tel: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      count: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
      timestamps: true,
      underscored: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return user;
};
