"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.review);
      this.hasMany(models.question);
      this.belongsToMany(models.lobby, { through: "users_lobbies" });
      this.hasMany(models.message);
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilepicture: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.TEXT,
      },
      tokens: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lobbiesJoin: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      online: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
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
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
