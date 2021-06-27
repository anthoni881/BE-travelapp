const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", async (req, res) => {
  const email = req.body.email;
  const role = req.body.role;
  const long = "";
  const lat = "";
  if (role === "Tourist") {
    mysqlConnection.query(
      "SELECT * FROM tourist WHERE email = ?",
      [email],
      function(error, results, fields) {
        // console.log(results);
        mysqlConnection.query(
          "UPDATE tourist SET longitude = ?, latitude = ? WHERE email = ?",
          [long, lat, email],
          function(error, results, fields) {
            console.log(results);
          }
        );
      }
    );

    
  } else {
    mysqlConnection.query(
      "SELECT * FROM tour_guide WHERE email = ?",
      [email],
      function(error, results, fields) {
        console.log(results);
        mysqlConnection.query(
          "UPDATE tour_guide SET longitude = ?, latitude = ? WHERE email = ?",
          [long, lat, email],
          function(error, results, fields) {
            console.log(results);
          }
        );
      }
    );
  }
});
module.exports = Router;
