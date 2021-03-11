const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../db/models/index");
const { generateJWT } = require("../helpers/jwt");

module.exports = {
  userCreate: async (req = request, res = response) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        return res.status(400).json({
          ok: false,
          msg: "User already exist!",
        });
      }
      user = req.body;
      // Encriptar contraseña
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
      // Crear usuario en la base de datos
      const createdUser = await User.create(user);
      // Generar JWT
      const token = await generateJWT(createdUser.id, createdUser.name);
      const { id: uid, name } = createdUser;
      res.status(201).json({
        ok: true,
        name,
        uid,
        token,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong trying to access to database!",
        error,
      });
    }
  },
  userLogin: async (req = request, res = response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: `User email doesn't exist!`,
        });
      }
      // Confirmar los passwords
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: `Password incorrect!`,
        });
      }
      // Generar el JWT
      const token = await generateJWT(user.id, user.name);
      res.json({
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong trying to access to database!",
        error,
      });
    }
  },
  userRenewToken: async (req = request, res = response) => {
    try {
      const { uid, name } = req;
      // Generar un nuevo JWT
      const token = await generateJWT(uid, name);
      console.log({ uid, name });
      res.json({
        ok: true,
        uid,
        name,
        token,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong trying to access to database!",
        error,
      });
    }
  },
};
