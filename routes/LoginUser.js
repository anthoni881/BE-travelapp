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
        function (error, results, fields) {
          if (results < 1) {
            res.statusCode = 401;
            res.send("Username anda salah");
            console.log("Username anda salah");
          } else {
            const hash = results[0].password.toString();
            bcrypt.compare(password, hash, function (err, response) {
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
                res.statusCode = 401;
                res.send("Password Anda Salah!");
                console.log("Password Salah");
              }
              res.end();
            });
          }
        }
      );
    } else if (role === "admin") {
      mysqlConnection.query(
        "SELECT * FROM admin WHERE username_admin = ?",
        [username],
        function (error, results, fields) {
          if (results < 1) {
            res.statusCode = 401;
            res.send("Username anda salah");
            console.log("Username anda salah");
          } else {
            const hash = results[0].password_admin.toString();
            console.log(hash);
            
            bcrypt.compare(password, hash, function (err, response) {
              
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
                console.log("Admin berhasil masuk");
              } else {
                res.statusCode = 401;
                res.send("Password Anda Salah!");
                console.log("Password Salah");
              }
              res.end();
            });
          }
        }
      );
    } else {
      
      mysqlConnection.query(
        "SELECT * FROM tour_guide WHERE email = ?",
        [username],
        function (error, results, fields) {
          console.log(results[0].verif);
          if (results[0].verif === "active") {
            if (results < 1) {
              res.statusCode = 401;
              res.send("Username anda salah");
              console.log("Username anda salah");
            } else {
              const hash = results[0].password.toString();
              bcrypt.compare(password, hash, function (err, response) {
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
                  res.status(401).send(error);
                  console.log("Password Salah");
                }
                res.end();
              });
            }
          } else {
            console.log("Akun anda Belum Aktif atau Tidak aktif");
            res.status(401).send("Akun anda Belum Aktif atau Tidak aktif");
          }
        }
      );
    }
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});
module.exports = Router;
