const express = require("express");
const bodyParser = require("body-parser");
const PeopleRoutes = require("./routes/people");
const InsertRoutes = require("./routes/SignUpUser");
const LoginRoutes = require("./routes/LoginUser");
const Location = require("./routes/Location");
const Logout = require("./routes/Logout");
const session = require("express-session");
const Verification = require("./routes/Verification");
const Approval = require("./routes/Approval");
const Profile = require("./routes/Profile");
const Maps = require("./routes/Maps");
const cors = require("cors");
let port = process.env.PORT || 5000;
let app = express();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/people", PeopleRoutes);
app.use("/signupuser", InsertRoutes);
app.use("/loginuser", LoginRoutes);
app.use("/location", Location);
app.use("/logout", Logout);
app.use("/verification", Verification);
app.use("/approval", Approval);
app.use("/profile", Profile);
app.use("/maps", Maps);

app.listen(port);
