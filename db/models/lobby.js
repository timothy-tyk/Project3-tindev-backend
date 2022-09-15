"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lobby extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.user, { through: "users_lobbies" });
      this.hasMany(models.question);
    }
  }
  Lobby.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      numberOnline: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "lobby",
      underscored: true,
    }
  );
  return Lobby;
};
