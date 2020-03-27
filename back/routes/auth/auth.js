const express = require("express");
const authRouter = express.Router();
const connection = require("../../helpers/db");

/* authRouter.post("/signup", function(req, res, next) {
  res.send("I am in POST signup");
}); */
authRouter.post("/signup", (req, res, next) => {
  const formData = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, results) => {
    if (error) res.status(500).json({ flash: error.message });
    else res.status(200).json({ flash: "User has been signed up!" });
    /*   if (err) {
      res.status(500).send(err);
      res.end();
    } else {
      res.status(200).json(results);
      res.end();
    } */
  });
});
module.exports = {
  authRouter
};
