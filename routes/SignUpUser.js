const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
Router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let img = req.body.img;
  let role = req.body.role;
  let name = req.body.name;
  let phoneNumber = req.body.phone_number;
  if (role === "tourist") {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      mysqlConnection.query(
        `INSERT INTO tourist (email, name, password, img, phone_number, role) VALUES ("${email}","${name}","${hash}","${img}","${phoneNumber}","${role}")`,
        (err, rows, fields) => {
          if (!err) {
            res.send("Data Anda berhasil disimpan");
            console.log("Data Wisatawan berhasil disimpan");
          } else {
            console.log(err);
          }
        }
      );
    });
  } else if (role === "tourguide") {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      mysqlConnection.query(
        `INSERT INTO tour_guide (email, name, password, img, phone_number, role) VALUES ("${email}","${name}","${hash}","${img}","${phoneNumber}","${role}")`,
        (err, rows, fields) => {
          if (!err) {
            res.send("Data Anda berhasil disimpan");
            console.log("Data Pemandu Wisata berhasil disimpan");
          } else {
            res.send("Email telah digunakan");
            console.log(err);
          }
        }
      );
    });
  } else {
    res.send("Error");
    console.log("error");
  }
});
module.exports = Router;
