const Sequelize = require("sequelize");
const db = new Sequelize("disneyapp", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
