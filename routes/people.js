const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});
module.exports = Router;
