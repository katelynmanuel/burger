// Import MySQL connection.
let connection = require("../config/connection.js");

// Object for all SQL statement functions. 
let orm = {
    // Function to view (select) all from burgers table.
    all: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        // SQL connection
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Function to update burger from not devoured to devoured.
    update: function (table, objColVals, condition, cb) {
        var queryString = `UPDATE ${table} SET ? WHERE ${condition}`
        console.log(queryString);
        connection.query(queryString, [objColVals], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

//Creating ORM export.
module.exports = orm;
