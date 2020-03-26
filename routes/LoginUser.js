const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
Router.post("/", (req, res) => {
  let username = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  if (username && password) {
    if (role === "Tourist") {
      
      mysqlConnection.query(
        "SELECT * FROM tourist WHERE email = ?",
        [username],
        function(error, results, fields) {
          if (error === null) {
            console.log("wew");
          } else {
            const hash = results[0].password.toString();
            bcrypt.compare(password, hash, function(err, response) {
              if (response === true) {
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
            });
          }
        }
      );
    } 
    else if(role === "Tour Guide") {
      mysqlConnection.query(
        "SELECT * FROM tour_guide WHERE email = ?",
        [username],
        function(error, results, fields) {
          if (error === null) {
            console.log("wew");
          } else {
            const hash = results[0].password.toString();
            bcrypt.compare(password, hash, function(err, response) {
              if (response === true) {
                req.session.loggedin = true;
                req.session.username = username;
                const token = jwt.sign({ id: username }, "secret_key");
                try {
                  var decoded = jwt.verify(token, "secret_key");
                } catch (err) {
                  // err
                }
                res.send({ token: decoded, data: results[0] });
                console.log("Pemandu Wisata berhasil masuk");
              } else {
                res.send("Username dan/atau Password Anda Salah!");
                console.log("Password Salah");
              }
              res.end();
            });
          }
        }
      );
    } 
    else {
      console.log("Covid-19");
      
    }
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});
module.exports = Router;
