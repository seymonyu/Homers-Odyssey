const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const { authRouter } = require("./routes/auth/auth");
const cors = require("cors");
const passport = require("passport");
const flash = require("express-flash");
LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      username: "email",
      password: "password",
      session: false
    },
    function(email, password, cb) {
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        if (!user.verifyPassword(password)) {
          return cb(null, false);
        }
        return cb(null, user);
      });
    }
  )
);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("youhou");
});
/// in case path is not found, return the 'Not Found' 404 code
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// launch the node server
let server = app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port " + server.address().port);
});
