const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const bcrypt = require("bcrypt");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname.replace(/\s/g, ""));
  },
});
const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });
const saltRounds = 10;
Router.post("/", upload.any("img"), (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  let name = req.body.name;
  let phoneNumber = req.body.phone_number;
  let ktpNumber = req.body.ktp_number;
  let region = req.body.region;

  if (role === "Tourist") {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      mysqlConnection.query(
        `INSERT INTO tourist (email, name, password, phone_number, role) VALUES ("${email}","${name}","${hash}","${phoneNumber}","${role}")`,
        (err, rows, fields) => {
          if (!err) {
            res.send("Data Anda berhasil disimpan");
            console.log("Data Wisatawan berhasil disimpan");
          } else {
            res.send("Email Telah Digunakan");
            console.log(err);
          }
        }
      );
    });
  } else if (role === "Tour Guide") {
    let img = req.files[0].path.replace(/\s/g, "");
    bcrypt.hash(password, saltRounds, function (err, hash) {
      mysqlConnection.query(
        `INSERT INTO tour_guide (email, name, password, img, phone_number, ktp_number, region, verif) VALUES ("${email}","${name}","${hash}","${img}","${phoneNumber}","${ktpNumber}","${region}","false")`,
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
  }
});
module.exports = Router;
