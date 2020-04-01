const express = require("express");
const authRouter = express.Router();
const connection = require("../../helpers/db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
require("dotenv").config();
authRouter.use(passport.initialize());

authRouter.post("/signup", (req, res) => {
  const data = req.body;
  const name = data.name;
  const lastname = data.lastname;
  const password = data.password;
  const email = data.email;
  const flash = data.flash;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    connection.query(
      `INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)`,
      [email, hash, name, lastname, flash],
      (error, results) => {
        if (error) {
          res.status(500).send(console.log(error));
        } else {
          res.json({ flash: "You were sign in" });
        }
      }
    );
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
      session: true
    },
    function(email, password, done) {
      connection.query(
        "SELECT * FROM users WHERE email= ?",
        [email],

        function(err, comeback) {
          if (err) {
            return done(err);
          }
          if (!comeback[0]) {
            return done(false, { message: "there is no matching email" });
          }

          const passwordMatching = bcrypt.compare(
            password,
            comeback[0].password
          );
          if (!passwordMatching) {
            return done(false, { message: "the password is not valid" });
          }
          return done(null, comeback[0]);
        }
      );
    }
  )
);
authRouter.post("/signin", function(req, res) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({ message: info.message });
    if (user.hasOwnProperty("email")) {
      const token = jwt.sign(
        JSON.stringify(user),
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.send({ user, token });
    }
    return res.send(user);
  })(req, res);
});

authRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.send(req.user);
  }
);
module.exports = {
  authRouter
};
