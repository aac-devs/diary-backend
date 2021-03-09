const { request, response } = require("express");

module.exports = {
  create: async (req = request, res = response) => {
    res.json("user - create");
  },
  login: async (req = request, res = response) => {
    res.json("user - login");
  },
  renewToken: async (req = request, res = response) => {
    res.json("user - renew token");
  },
};
