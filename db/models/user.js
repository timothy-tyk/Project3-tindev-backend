"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.review, { foreignKey: "revieweeId" });
      this.hasMany(models.review, { foreignKey: "reviewerId" });
      this.hasMany(models.question, { foreignKey: "menteeId" });
      this.hasMany(models.question, { foreignKey: "mentorId" });
      this.belongsToMany(models.lobby, { through: "users_lobbies" });
      this.hasMany(models.message);
      // this.belongsToMany(models.user, { through: "users_friends" });
      // this.belongsToMany(models.user, {
      //   as: "friends",
      //   foreignKey: "user_id1",
      //   through: "users_friends",
      // });
      // this.belongsToMany(models.user, {
      //   as: "userFriends",
      //   foreignKey: "user_id2",
      //   through: "users_friends",
      // });
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
      location: {
        type: DataTypes.STRING,
      },
      friendsList: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
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
