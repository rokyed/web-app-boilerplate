var express = require('express');
var app = new express.Router();
var Utils = require('../extras/Utils.js');
var config = require('../../config.json')
var r = require('rethinkdb');

app.get('/', function (req, res, next) {
    var data = Utils.purgedData(Utils.stripUnwantedData(req.query, config.userCreate.requiredFields));

    if (Utils.validateFields(data, config.userCreate.fieldsValidation)) {
        data = Utils.stripUnwantedData(data, config.userCreate.savedFields);
        data.id = data[config.userCreate.idFromVariable];

        r.connect(config.database).then(function(connection) {
            r.table('users').insert(data).run(connection).then(function () {
                res.json({
                    response: 'done'
                });
            }).error(function() {
                res.json({
                    response: 'failed'
                });
            });
        });
    } else {
        res.json({
            response: 'failed'
        });
    }
});

module.exports = app;
