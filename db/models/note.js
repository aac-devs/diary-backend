"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.User);
    }
  }
  Note.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
