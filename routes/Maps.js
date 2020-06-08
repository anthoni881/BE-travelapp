const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.post("/", async (req, res) => {
  const long = req.body.long;
  const lat = req.body.lat;
  
    mysqlConnection.query(
      "SELECT `id`,`name`, `email`, `img`, `phone_number`, `description`, `longitude`, `latitude`, ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 AS `distance` FROM `tour_guide` WHERE ACOS( SIN( RADIANS( `latitude` ) ) * SIN( RADIANS( '" + lat + "' ) ) + COS( RADIANS( `latitude` ) ) * COS( RADIANS( '" + lat + "' )) * COS( RADIANS( `longitude` ) - RADIANS( '" + long + "' )) ) * 6380 < 10 ORDER BY `distance` ",
      function(error, results, fields) {
        console.log(results);
        console.log(error);
        
        
        res.send(results)
      }
    );
});
module.exports = Router;
