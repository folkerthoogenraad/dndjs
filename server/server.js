var express = require('express');
var app = express();
var fs = require("fs");
var db = require("./database.js");
var keys = require("./keys.js");
var crypto = require('crypto');

/*var keys = [];

function getUserIdByKey(key){
  if(keys[key] !== undefined)
    return keys[key];
  else
    return -1;
}*/

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

//Return the inventory for this user
app.get('/inventory', function(req, res){
  var userID = getUserIdByKey(req.query.key);

  if(userID < 0){
    res.status(400).send("Invalid user token.");
    return;
  }

  db.getInventoryById(getUserIdByKey(req.query.key), function(result){
    res.end(JSON.stringify(result));
  });

});

/*
===============================================================================
===============================================================================
*/

//Refactor this, update this, make it safe.
app.get('/items/create', function(req, res){
  /*var userID = getUserIdByKey(req.query.key);

  if(userID < 0){
    res.status(400).send("Invalid user token.");
    return;
  }*/

  //TODO check if its an s̶y̶s̶t̶e̶m̶ ̶a̶d̶m̶i̶n̶  Gunther! Very important!

  db.createItem(req.query.name, req.query.description, req.query.value, req.query.weight, function(err){
    if(err){
      res.status(400).send("Couldn't create item.");
    }
    res.status(200).send("Done!");
  });

});


var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log("Server listening on port %s", port);

});
