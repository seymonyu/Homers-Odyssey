const express = require("express");
const authRouter = express.Router();

authRouter.post("/signup", function(req, res, next) {
  res.send("I am in POST signup");
});

module.exports = {
  authRouter
};
