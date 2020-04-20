const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM tour_guide WHERE verif = 'false'",
    function (err, rows, fields) {
      console.log(rows);
    }
  );
});
module.exports = Router;
