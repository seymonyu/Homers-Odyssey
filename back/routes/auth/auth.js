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
      passwordField: "user[password]"
    },
    function(email, password, done) {
      connection.query(
        `INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)`,
        [email],
        (error, results) => {
          if (error) {
            res.status(500).send(console.log(error));
          } else {
            res.json({ flash: "You were sign in" });
          }
        }
      );
    }
  )
);
authRouter.post("/signin", function(req, res) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({ message: info.message });
    return res.json({ user });
  })(req, res);
});
module.exports = {
  authRouter
};
