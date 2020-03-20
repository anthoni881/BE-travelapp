const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const jwt = require("jsonwebtoken");

Router.post("/", (req, res) => {
  let username = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  if (username && password) {
    if (role === "tourist") {
      mysqlConnection.query(
        "SELECT * FROM tourist WHERE email = ? AND password = ?",
        [username, password],
        function(error, results, fields) {
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            const token = jwt.sign({ id: username }, "secret_key");
            try {
              var decoded = jwt.verify(token, "secret_key");
            } catch (err) {
              // err
            }
            res.send({ token: decoded, data: results[0] });
            console.log("Wisatawan berhasil masuk");
          } else {
            res.send("Username dan/atau Password Anda Salah!");
            console.log("Password Salah");
          }
          res.end();
        }
      );
    } else {
      mysqlConnection.query(
        "SELECT * FROM tour_guide WHERE email = ? AND password = ?",
        [username, password],
        function(error, results, fields) {
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            const token = jwt.sign({ id: username }, "secret_key");
            try {
              var decoded = jwt.verify(token, "secret_key");
            } catch (err) {
              // err
            }
            res.send({ token: decoded, data: results[0] });
            console.log("Wisatawan berhasil masuk");
          } else {
            res.send("Username dan/atau Password Anda Salah!");
            console.log("Password Salah");
          }
          res.end();
        }
      );
    }
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});
module.exports = Router;
