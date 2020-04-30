const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", (req, res) => {
    const email=req.body.email;
    const approval=req.body.approval;
  mysqlConnection.query(
    "UPDATE tour_guide SET verif = ? WHERE email = ?;",
    [approval,email],
    function(error, results, fields) {
        res.send("Data Berhasil Disimpan")
    }
  );
  
});
module.exports = Router;