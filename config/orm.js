// Import MySQL connection.
let connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    let arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL Syntax 
function objToSql(ob) {
    let arr = [];
    // Loop through they keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // If string has spaces, add quotations
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    // Translate array of strings to a single comma-eparated string.
    return arr.toString();
};

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
    //Function to create burger from form.
    create: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log("Create Query String: " + queryString);

        // SQL Connection
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Function to update burger from not devoured to devoured.
    update: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition; 

        console.log("Update Query String: ", queryString);

        //SQL Connection
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

//Creating ORM export.
module.exports = orm;
