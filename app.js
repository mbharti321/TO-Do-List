//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({encoded: true}));
app.use(express.static("public"))

let newItems = ["buy food", "cook food", "eat", "sleep"];
app.get("/", function (req, res) {

    let today = new Date();

    let options = {
        weekday:'long',
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);
   
    res.render("list", {
        kindOfDay: day,
        newListItems: newItems
    });
});

app.post("/", function (req, res) {
    newItems.push( req.body.newItem);
    res.redirect("/")
});

app.listen(3000, function () {
    console.log("Server Started!!\nListening to port: http://localhost:3000/")
});