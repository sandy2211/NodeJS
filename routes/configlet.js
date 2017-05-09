var express = require("express");
var ConfigletDataModel = require("../models/configletData")
var router = express.Router()

var handleAdd = function (req, res) {
    console.log("Add")
    var configBody = req.body;
    console.log(configBody)
    ConfigletDataModel.addConfig(configBody, function (result) {
        res.status(200);
        res.json(result);
    });
};

var handleDelete = function (req, res) {
    var params = req.params;
    var configId = params.id;
    ConfigletDataModel.deleteConfig(configId, function (result) {
        res.status(200);
        res.json(result);
    });
};

var handleGetAll = function (req, res) {
    ConfigletDataModel.getAllConfigs(function (result) {
        res.status(200);
        res.json(result);
    })
};

var handleGet = function (req, res) {
    var params = req.params;
    var configId = params.id;
    ConfigletDataModel.getConfig(configId, function (result) {
        res.status(200);
        res.json(result);
    });
};

var handleUpdate = function (req, res) {
    ConfigletDataModel.updateConfig(req.body._id, req.body, function (result) {
        res.status(200);
        res.json(result);
    });
};

router.post("/add", handleAdd);
router.get("/getAll", handleGetAll);
router.get("/get/:id", handleGet);
router.delete("/delete/:id", handleDelete);
router.post("/update", handleUpdate);

module.exports = router