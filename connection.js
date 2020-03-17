const mysql = require("mysql");

// var mysqlConnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "Edureka",
//   multipleStatements: true
// });
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jupiter 12",
  database: "travelapp",
  multipleStatements: true
});
mysqlConnection.connect(err => { 
  if (!err) {
    console.log("Connected");
  } else console.log(err);
});
module.exports = mysqlConnection;
