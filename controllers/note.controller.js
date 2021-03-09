const { request, response } = require("express");

module.exports = {
  getAll: async (req = request, res = response) => {
    res.json("note - getAll");
  },
  create: async (req = request, res = response) => {
    res.json("note - create");
  },
  update: async (req = request, res = response) => {
    res.json("note - update");
  },
  remove: async (req = request, res = response) => {
    res.json("note - delete");
  },
};
