var express = require('express');
var app = express();
var fs = require("fs");
var db = require("./database.js");
var keys = require("./keys.js");
var crypto = require('crypto');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

//Register user endpoints
require("./users.js")(app, db, keys);
require("./tokens.js")(app, db, keys);
require("./items.js")(app, db, keys);
require("./dungeon.js")(app, db, keys);


var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log("Server listening on port %s", port);

});
