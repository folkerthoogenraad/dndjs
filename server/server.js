var express = require('express');
var app = express();
var fs = require("fs");
var db = require("./database.js");

var keys = [];

function getUserIdByKey(key){
  if(keys[key] !== undefined)
    return keys[key];
  else
    return -1;
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

/*
===============================================================================
===============================================================================
*/

//Give this user his or her token
app.get('/token', function (req, res) {
  var user = req.query.username;
  var password = req.query.password;

  //Login the user :)
  db.getUserIdByNameAndPassword(user, password, function(userID){
    var key = "" + Math.random() * 100000000;
    //TODO check password!
    keys[key] = userID;

    res.end(JSON.stringify({
      key: key,
      name: user
    }));
  });



});

//get user info :), this needs to get shittonnes better by the way <3
app.get('/user', function (req, res) {
  var userID = getUserIdByKey(req.query.key); //TODO do stuff with this
  if(userID < 0){
    res.status(400).send("Invalid user token.");
    return;
  }

  //fetch the user data from the database
  db.getUserDataById(userID, function(result){
    res.end(JSON.stringify(result));
  });

});

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

//Using a get request for registering #yolo #best programmer EUW
app.get('/register', function(req, res){
  var user = req.query.username;
  var password = req.query.password;
  var name = req.query.realname;

  console.log(user + " tried to register.");

  //TODO save in the database and stuff
  res.status(200).send("Stuff went well :D");
});

/*
===============================================================================
===============================================================================
*/

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log("Server listening on port %s", port);

});
