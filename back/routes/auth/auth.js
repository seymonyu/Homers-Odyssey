/* const express = require("express");
const authRouter = express.Router();
const connection = require("../../helpers/db");

/* authRouter.post("/signup", function(req, res, next) {
  res.send("I am in POST signup");
}); *
authRouter.post("/signup", (req, res, next) => {
  const { flash, ...formData } = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, res) => {
    if (err) {
      res.send(console.log(err));
      //res.status(500).json({ flash: err.message });
      //res.end();
    } else {
      res.status(200).json({ flash: "User has been signed up!" });
      //res.end();
    }
  });
});
module.exports = {
  authRouter
}; */

const express = require("express");
const authRouter = express.Router();
const connection = require("../../helpers/db");

/* authRouter.post("/signup", function(req, res, next) {
  res.send("I am in POST signup");
}); */

authRouter.post("/signup", (req, res) => {
  const { flash, ...formData } = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, result) => {
    if (err) {
      /* res.send(console.log(err)); */
      res.status(500).json({ flash: err.message });
      res.end();
    } else {
      res.status(200).json({ flash: "User has been signed up!" });
      res.end();
    }
  });
});
module.exports = {
  authRouter
};
