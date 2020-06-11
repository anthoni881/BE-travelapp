const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
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
Router.post("/", upload.any("img"), (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let name = req.body.name;
  let phoneNumber = req.body.phone_number;
  let role = req.body.role;
  let description = req.body.description;
  let img = req.files ? req.files[0].path.replace(/\s/g, "") : "";

  if (role === "Tourist") {
    mysqlConnection.query(
      "UPDATE tourist SET name = ?, img_profile = ? , phone_number = ?, email = ? WHERE id = ?",
      [name, img, phoneNumber, email, id],
      function (error, results,fields) {
        mysqlConnection.query("SELECT * FROM tourist WHERE id = ?",
        [id],
        function(error,results,fields){
          res.send(results);
        });
      }
    );
  } else {
    console.log("hallew");
    mysqlConnection.query(
      "UPDATE tour_guide SET name = ?, img_profile = ?, phone_number = ?, description = ?, email = ? WHERE id = ?",
      [name, img, phoneNumber, description, email, id],
      function (error, results, fields) {
        mysqlConnection.query("SELECT * FROM tour_guide WHERE id = ?",[id],
        function(error,results,fields){
          res.send(results);
        })
      }
    );
  }
});
module.exports = Router;
