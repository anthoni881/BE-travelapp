const express = require("express");
const bodyParser = require("body-parser");
const PeopleRoutes = require("./routes/people");
const InsertRoutes = require("./routes/insert");
const AuthRoutes = require("./routes/login");
const session = require("express-session");
const cors = require("cors");
let port = process.env.PORT || 1010;
let app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/people", PeopleRoutes);
app.use("/insert", InsertRoutes);
app.use("/auth", AuthRoutes);

app.listen(port);
