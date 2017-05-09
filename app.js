var express = require("express");
var bodyParser = require("body-parser")
var ConfigletRoute = require("./routes/configlet")
var app = express()
app.use(bodyParser.json())
app.use("/configlet",ConfigletRoute)
app.listen(8088)