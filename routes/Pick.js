const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", (req, res) => {
  let tourGuideId = req.body.tourGuideId;
  let touristId = req.body.touristId;

  mysqlConnection.query(
    `INSERT INTO history (tour_guide_id, tourist_id) VALUES ("${tourGuideId}","${touristId}")`,
    function (error, results, fields) {
      res.send("Anda Berhasil Memilih Pemandu Wisata");
      console.log("Sukses");
      console.log(tourGuideId);
      console.log(touristId);
      // console.log(error);
      console.log(results);
      
      
      
    }
  );
});
module.exports = Router;
