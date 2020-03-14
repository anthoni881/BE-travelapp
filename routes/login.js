const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const jwt = require("jsonwebtoken");

Router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    mysqlConnection.query(
      "SELECT * FROM people WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          const token = jwt.sign(
            { id: username, role: password },
            "secret_key"
          );
          try {
            var decoded = jwt.verify(token, "secret_key");
          } catch (err) {
            // err
          }
          res.send(decoded);
          console.log("Anda berhasil masuk");
        } else {
          res.send("Incorrect Username and/or Password!");
          console.log("password salah begok");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});
module.exports = Router;
