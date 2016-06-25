var express = require('express');
var path =  require('path');
var config = require('./config.json');

var app = express();


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(config['port-listen']);
