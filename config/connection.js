// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost", //process.env.DB_HOST,
  port: 3306, // process.env.DB_PORT,
  user: "root", // process.env.DB_USER,
  password: "Lem0nworld19", // process.env.DB_PASS,
  database: "burgers_db" // process.env.DB_DATABASE
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;