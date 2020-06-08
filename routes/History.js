const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", (req, res) => {
  let touristId = req.body.touristId;
    mysqlConnection.query(
      "SELECT * FROM history WHERE tourist_id = ?",
      [touristId],
      function (error, results, fields) {
        let tourGuideListId = results.map((data) => data.tour_guide_id);
        mysqlConnection.query(
          `SELECT id, name, email, phone_number FROM tour_guide WHERE id IN (${tourGuideListId})`,
          function (error, results, fields) {
            console.log(results);
            res.send(results);
          }
        );
      }
    );
});
module.exports = Router;
