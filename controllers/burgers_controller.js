var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log("hbs Object: ", JSON.stringify(hbsObject, null, 2));
        res.render("index", hbsObject);
    });
});

//Update a burger from 
router.put("/:id", function (req, res) {
    burger.update(req.params.id, function(result) {
        console.log("Put res: " + result);
        res.redirect("/");
    })
})

router.post("/", function(req, res) {
    burger.create("burger_name", req.body.name, function() {
        res.redirect("/");
    });
});

module.exports = router;
