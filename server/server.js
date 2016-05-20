var express = require('express');
var app = express();
var fs = require("fs");

var keys = [];

function getUserIdByKey(key){
  return true;
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

  //TODO check password!
  keys[user] = Math.random() * 100000;

  res.end(JSON.stringify({
    key: keys[user],
    name: user
  }));

});

//get user info :), this needs to get shittonnes better by the way <3
app.get('/user', function (req, res) {
  var user = getUserIdByKey(req.query.key); //TODO do stuff with this

  setTimeout(function(){
    res.end(JSON.stringify({
      name:"Varis Ermagahd",
      gold:12
    }));
  },2000);

});

//Return the inventory for this user
app.get('/inventory', function(req, res){
  if(!getUserIdByKey(req.query.key)){
    res.status(400).send("Invalid user token.");
    return;
  }
  res.end(JSON.stringify(
    [{
      "name":"Longsword",
      "description":"1d8 damage, Versitile (1d10), Piemels, Hansaplasts",
      "value":8,
      "weight":13,
    }]
  ));
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
