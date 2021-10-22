//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ encoded: true }));
app.use(express.static("public"))

let newItems = ["buy food", "cook food", "eat", "sleep"];
let workItems = [];
app.get("/", function (req, res) {

    let today = new Date();

    let options = {
        weekday: 'long',
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        listTitle: day,
        newListItems: newItems
    });
});
app.post("/", function (req, res) {
    if (req.body.listBtn === "work") {
        workItems.push(req.body.newItem);
        res.redirect("/work")
    } else {
        newItems.push(req.body.newItem);
        res.redirect("/")
    }

});


app.get("/work", function (req, res) {
    let options = {
        listTitle: "work",
        newListItems: workItems
    }
    res.render("list", options)
});

app.get("/about", function (req, res) {
        res.render("about")
});

app.listen(3000, function () {
    console.log("Server Started!!\nListening to port: http://localhost:3000/")
});