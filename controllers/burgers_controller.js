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

// Update a burger devoured status.
router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    console.log("Condition: ", condition);
    
    burger.update({ devoured: req.body.devoured }, condition, 
        function (result)  {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.post("/", function(req, res) {
    burger.create("burger_name", req.body.burger_name, function(result) {
        res.json({ id: result.insertId})
        res.redirect("/");
        console.log("Router Post: " + req.body.burger_name);
    });
});

// Export routes for server.js to use.
module.exports = router;
