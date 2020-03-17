const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  mysqlConnection.query(
    `INSERT INTO user (iduser ,email, password) VALUES (${1},"${email}","${password}")`,
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
