"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {}
  }
  Note.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      date: DataTypes.DATE,
      uid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
