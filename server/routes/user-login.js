var express = require('express');
var app = new express.Router();
var Utils = require('../extras/Utils.js');
var config = require('../../config.json');

app.get('/', function (req, res, next) {
    if (!req.session.myVar)
        req.session.myVar = 0;

    req.session.myVar ++;

    console.log(req.query);
    console.log(req.query.variabilaMea);

    console.log('someone accessed test this many times : ', req.session.myVar);

    res.json({
        response: 'done',
        myVar: req.session.myVar
    });
});

module.exports = app;
