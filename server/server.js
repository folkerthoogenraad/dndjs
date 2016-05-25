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

app.use(function(req, res, next){
  req.user = {
    key : req.query.key,
    id : keys.getUserId(req.query.key),
    admin : false,
    valid : false
  };
  req.user.admin = keys.isAdmin(req.user.id);
  req.user.valid = req.user.key !== undefined;

  req.user.requireAdmin = function(){
    if(!req.query.key){
      res.status(400).send("No key specified");
      return false;
    }

    if(!req.user.id){
      res.status(400).send("Invalid key");
      return false;
    }

    if(!req.user.admin){
      res.status(403).send("Unauthorized, you need to be admin for this");
      return false;
    }

    return true;
  };

  req.user.requireLogin = function(){
    if(!req.query.key){
      res.status(400).send("No key specified");
      return false;
    }

    if(!req.user.id){
      res.status(400).send("Invalid key");
      return false;
    }

    return true;
  };
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
