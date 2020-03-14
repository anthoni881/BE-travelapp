const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  mysqlConnection.query(
    `INSERT INTO people (username, password) VALUES ("${username}","${password}")`,
    (err, rows, fields) => {
      if (!err) {
        res.send("berhasil disimpan");
        console.log("berhasil disimpan");
      } else {
        console.log(err);
      }
    }
  );
});
module.exports = Router;
