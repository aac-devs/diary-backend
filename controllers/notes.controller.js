const { request, response } = require("express");
const { Note } = require("../db/models/index");

module.exports = {
  getNotes: async (req = request, res = response) => {
    try {
      const { uid } = req;
      const notes = await Note.findAndCountAll(uid);
      res.json({
        ok: true,
        notes,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong trying to access to database!",
        error,
      });
    }
  },
  createNote: async (req = request, res = response) => {
    try {
      const data = req.body;
      data.uid = req.uid;
      const note = await Note.create(data);
      res.status(201).json({
        ok: true,
        note,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong trying to access to database!",
        error,
      });
    }
  },
  updateNote: async (req = request, res = response) => {
    // TODO: terminar de crear la ruta
    const { id } = req.params;
    const { title, body, date } = req.body;
    const { uid } = req;

    const note = await Note.update(
      {
        title,
        body,
        date,
        uid,
      },
      {
        where: {
          id,
        },
      }
    );

    res.json(note);
  },
  removeNote: async (req = request, res = response) => {
    res.json("note - delete");
  },
  removeAllNotes: async (req = request, res = response) => {
    res.json("note - delete all");
  },
};
