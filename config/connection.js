// imports
const mysql = require('mysql');
const util = require('util');
// enviromental variables
require('dotenv').config();
const PORT = process.env.PORT;
const USER = process.env.USER;
const PASS = process.env.PASS;
const HOST = process.env.HOST;
const DB = process.env.NAME;
let connection;
// creating a connection to our mysql database using Heroku's JAWSDB if deployed to Heroku, or a local connection if in development
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASS,
    database: DB
  })
};

// connecting to above db
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// we give connection.query access to promises
// i.e. .then() and .catch()
connection.query = util.promisify(connection.query);
// exporting the connection so that they are available in other .js files
module.exports = connection;