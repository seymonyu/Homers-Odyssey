const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qvuj83tva",
  database: "Homer"
});
module.exports = connection;
//const connection = require('./helpers/db.js');
