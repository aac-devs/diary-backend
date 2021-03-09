const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/models/index");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.connectDB();
  }

  async connectDB() {
    try {
      await sequelize.sync({ force: true });
      console.log("Postgresql database online");
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
