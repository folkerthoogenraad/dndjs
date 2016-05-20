var express = require('express');
var app = express();
var fs = require("fs");
var db = require("./database.js");
var crypto = require('crypto');

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

  //TODO check if its an system admin! Very important!

  db.createItem(req.query.name, req.query.description, req.query.value, req.query.weight, function(err){
    if(err){
      res.status(400).send("Couldn't create item.");
    }
    res.status(200).send("Done!");
  });

});


/*
===============================================================================
===============================================================================
*/

//Give this user his or her token
app.get('/token', function (req, res) {
  var user = req.query.username;
  //Don't store plain text passwords kids, although md5 is not much better :')
  var password = crypto.createHash('md5').update(req.query.password).digest('hex');

  //Login the user :)
  db.getUserIdByNameAndPassword(user, password, function(err, userID){
    if(err){
      res.status(402).send("Login failed!");
      return;
    }

    var key = "" + Math.random() * 100000000;
    //TODO check password!
    keys[key] = userID;

    res.end(JSON.stringify({
      key: key,
      name: user
    }));
  });
});

//Using a get request for registering #yolo #best programmer EUW
app.get('/register', function(req, res){
  var user = req.query.username;
  //Don't store plain text passwords kids, although md5 is not much better :')
  var password = crypto.createHash('md5').update(req.query.password).digest('hex');
  var name = req.query.realname;

  console.log(user + " tried to register.");

  db.createUser(user,password,name, function(err){
    if(err){
      res.status(400).send("It broke!");
    }else{
      //close but not even close spelling <3
      res.status(200).send("Registered succesuffly");
    }
  });
});

/*
===============================================================================
===============================================================================
*/

var server = app.listen(8080, function () {
  var port = server.address().port;
  console.log("Server listening on port %s", port);

});
