require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const connection = require("../../helpers/db.js");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwt = require("jsonwebtoken");

authRouter.use(passport.initialize());

authRouter.post("/signup", (req, res, next) => {
  const { flash, open, ...newUser } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    connection.query(
      `INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)`,
      [email, hash, name, lastname, flash],
      (err, results) => {
        if (err) {
          res.status(500).json({ flash: err.message });
        } else {
          res.status(200).json({ flash: "You were signed up" });
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

        async function(err, results) {
          if (err) {
            return done(err);
          }
          if (!results[0]) {
            return done(null, false, { message: "there is no matching email" });
          }

          const passwordMatching = await bcrypt.compare(
            password,
            results[0].password
          );
          if (!passwordMatching) {
            return done(null, false, { message: "the password is not valid" });
          }
          return done(null, results[0]);
        }
      );
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    },
    function(jwtPayload, done) {
      connection.query(
        "SELECT * FROM users WHERE email = ?",

        [jwtPayload.email],
        function(err, results) {
          if (err) {
            return done(err);
          }
          console.log(jwtPayload);
          return done(null, results[0]);
        }
      );
    }
  )
);

authRouter.post("/signin", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return;

    res.status(500).send(err);
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
