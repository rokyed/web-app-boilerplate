var express = require('express');
var path =  require('path');
var config = require('./config.json');
var loader = require('./loader.js');
var session = require('express-session');
var cookieParser = require('cookie-parser')

var app = express();

app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 600000
  }
}));

app.use('/', express.static(__dirname + '/client'));

for (var route in loader.routes) {
        app.use(config.backendPath + '/' + route, loader.routes[route]);
}

app.listen(config['port-listen']);
