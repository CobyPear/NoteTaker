const mysql = require('mysql');
const util = require('util');
let connection;

// creating a connection to our mysql database
if (process.emitWarning.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: ''
      });
};

// connecting to said db
connection.connect(function(err) {
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