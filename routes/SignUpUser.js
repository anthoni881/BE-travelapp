const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
Router.post("/", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let img = req.body.img;
  let role = req.body.role;
  if (role === "tourist") {
    mysqlConnection.query(
      `INSERT INTO tourist (email, password, img, role) VALUES ("${email}","${password}","${img}","${role}")`,
      (err, rows, fields) => {
        if (!err) {
          res.send("Data Anda berhasil disimpan");
          console.log("Data Wisatawan berhasil disimpan");
        } else {
          console.log(err);
        }
      }
    );
  } else if (role === "tourguide") {
    mysqlConnection.query(
      `INSERT INTO tour_guide (email, password,img,role) VALUES ("${email}","${password}","${img}","${role}")`,
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
  } else {
    res.send("Error");
    console.log("error");
  }
});
module.exports = Router;
