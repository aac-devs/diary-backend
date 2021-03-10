const { request, response } = require("express");
const { Note } = require("../db/models/index");

module.exports = {
  getNotes: async (req = request, res = response) => {
    try {
      const { uid } = req;
      console.log(uid);
      const notes = await Note.findAndCountAll({ where: { uid } });
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
      const { body, uid } = req;
      const data = { ...body, uid };
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
    try {
      const {
        params: { id },
        body,
        uid,
      } = req;
      const userNote = await Note.findByPk(id);
      if (userNote.uid !== uid) {
        return res.status(400).json({
          ok: false,
          msg: `Can't update a note from other user!`,
        });
      }
      const data = { ...body, uid };
      await Note.update(data, {
        where: { id },
      });
      const note = await Note.findByPk(id);
      res.json({
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
  removeNote: async (req = request, res = response) => {
    try {
      const {
        params: { id },
        uid,
      } = req;
      const userNote = await Note.findByPk(id);
      if (userNote.uid !== uid) {
        return res.status(400).json({
          ok: false,
          msg: `Can't delete a note from other user!`,
        });
      }
      await Note.destroy({
        where: { id },
      });
      res.json({
        ok: true,
        msg: "Note deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong trying to access to database!",
        error,
      });
    }
  },
  removeAllNotes: async (req = request, res = response) => {
    try {
      const { uid } = req;
      const notes = await Note.findAll({ where: { uid } });
      if (notes.length === 0) {
        return res.json({
          ok: false,
          msg: "There is not nothing to delete!",
        });
      }
      await Note.destroy({
        where: { uid },
      });
      res.json({
        ok: true,
        msg: "Notes deleted successfully!",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong trying to access to database!",
        error,
      });
    }
  },
};
