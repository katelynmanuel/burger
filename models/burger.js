let orm = require("../config/orm.js");

let burger = {
    all: function (cb) {
        orm.all("burgers", function (res) {
            cb(res);
        });
    },
    //cols and vals are arrays
    create:function(cols,vals, cb) {
        orm.create("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    update:function(condition, cb) {
        orm.update("burgers", {devoured: true}, condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
