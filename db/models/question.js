"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.lobby);
      this.belongsTo(models.user,{as:"menteeId", foreignKey:"menteeId"});
      this.belongsTo(models.user,{as:"mentorId", foreignKey:"mentorId"});
      this.hasOne(models.chatroom);
      this.hasMany(models.review);
      this.hasMany(models.message);
    }
  }
  Question.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      menteeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tokensOffered: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mentorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      lobbyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "lobby",
          key: "id",
        },
      },
      chatroomId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "chatroom",
          key: "id",
        },
      }
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
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
      modelName: "question",
      underscored: true,
    }
  );
  return Question;
};
