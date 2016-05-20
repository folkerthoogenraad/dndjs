var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password', //Don't mind me, just openly putting my password on GitHub <3
  database : 'dungeons'
});

connection.connect();

exports.getUserIdByNameAndPassword = function(name, password, callback){
  connection.query('SELECT id FROM users WHERE username=? AND password=?', [name, password], function(error, results, fields) {
    if (error){
      console.log(error);
      callback(error, -1);
      return;
    }

    if(results[0] !== undefined){
      callback(false, results[0].id);
    }else{
      callback(true, -1);
    }

  });
};

exports.getUserDataById = function(id, callback){
  connection.query('SELECT name, gold FROM users WHERE id=?', [id], function(error, results, fields) {
    if (error){
      console.log(error);
      callback({
        name:"???",
        gold:0
      });
      return;
    }

    if(results[0] !== undefined){
      callback({
        name:results[0].name,
        gold:results[0].gold
      });
    }else{
      callback({
        name:"???",
        gold:0
      });
    }
  });
};

exports.getInventoryById = function(id, callback){
  callback([{
    "name":"Longsword",
    "description":"1d8 damage, Versitile (1d10), Piemels, Hansaplasts",
    "value":8,
    "weight":13,
  }]);
};

exports.createUser = function(username, password, realname, callback){

  var post = {
    username : username,
    password : password,
    name : realname,
    gold : 0
  };

  connection.query('INSERT INTO users SET ?', post, function(err, result) {
    if (err){
      console.log(err);
      callback(err);
      return;
    }

    callback(undefined);
  });
};

exports.createItem = function(name, description, value, weight, callback){
  var post = {
    name : name,
    description : description,
    value : value,
    weight : weight
  };

  connection.query('INSERT INTO items SET ?', post, function(err, result) {
    if (err){
      console.log(err);
      callback(err);
      return;
    }

    callback(undefined);
  });
};
