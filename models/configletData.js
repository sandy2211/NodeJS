var mongoose = require("mongoose")
var ObjectId = require('mongoose').Schema.ObjectId;
mongoose.connect("mongodb://localhost/CVPDB")
var connection = mongoose.connection
var Schema = mongoose.Schema
var objectId = Schema.objectId
var ConfigletSchema = new Schema({
    name: String,
    config: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now
    },
    configType: {
        type: String,
        default: "static"
    }
});

var ConfigModel = connection.model("config", ConfigletSchema)

var addConfig = function (configlet, resultHandler) {
    var ConfigletData = new ConfigModel(configlet);
    ConfigletData.save(function (err, successData) {
        if (err) {
            resultHandler("Something is wrong");
            //console.log(err);
        } else {
            resultHandler(successData);
            //console.log(successData);
        }
    });
}

var getAllConfigs = function (resultHandler) {
    ConfigModel.find({}, function (err, result) {
        if (err) {
            resultHandler("Something is wrong");
            //console.log(err);
        } else {
            resultHandler(result);
            //console.log(successData);
        }
    })
}

var getConfig = function (configletID, resultHandler) {
    console.log(configletID)
    ConfigModel.findOne({ _id: configletID }, function (err, result) {
        if (err) {
            resultHandler("Something is wrong");
            console.log(err);
        } else {
            resultHandler(result);
            //console.log(successData);
        }
    })
}

var deleteConfig = function (configletID, resultHandler) {
    console.log(configletID)
    ConfigModel.remove({ _id: configletID }, function (err, result) {
        if (err) {
            resultHandler("Something is wrong");
            console.log(err);
        } else {
            resultHandler(result);
            //console.log(successData);
        }
    })
}

var updateConfig = function (configletId, configlet, resultHandler) {
    ConfigModel.findOneAndUpdate({ _id: configletId }, configlet, { upsert: true }, function (err, result) {
        if (err) {
            resultHandler("Something is wrong");
            console.log(err);
        } else {
            resultHandler(result);
            //console.log(successData);
        }
    })
}


module.exports.addConfig = addConfig
module.exports.getAllConfigs = getAllConfigs
module.exports.getConfig = getConfig
module.exports.deleteConfig = deleteConfig
module.exports.updateConfig = updateConfig



