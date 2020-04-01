const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  masterDb: process.env.MASTER_DB,
  serverPort: process.env.SERVER_PORT,
  serverDb: process.env.SERVER_DB,
  JWTSecret: process.env.JWT_SECRET
};
