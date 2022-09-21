"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        as: "reviewerIdAlias",
        foreignKey: "reviewerId",
      });
      this.belongsTo(models.user, {
        as: "revieweeIdAlias",
        foreignKey: "revieweeId",
      });
      this.belongsTo(models.question);
    }
  }
  Review.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "question",
          key: "id",
        },
      },
      reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      revieweeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      reviewContent: {
        type: DataTypes.TEXT,
      },
      role: {
        type: DataTypes.TEXT,
      },
      rating: {
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
      modelName: "review",
      underscored: true,
    }
  );
  return Review;
};
