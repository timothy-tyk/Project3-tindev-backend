"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define separate 1-M relationships with both User and Lobby models
      // to enable them to query junction model
      this.belongsTo(models.user);
      this.belongsTo(models.lobby);
    }
  }
  UserLobby.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      lobbyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "lobby",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "users_lobbies",
      underscored: true,
    }
  );
  return UserLobby;
};
