var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password', //Don't mind me, just openly putting my password on GitHub <3
  database : 'dungeons'
});

connection.connect();

exports.getUserIdByNameAndPassword = function(name, password, callback){
  connection.query('SELECT id, rights, password FROM User WHERE username=?', [name, password], function(error, results, fields) {
    if (error){
      console.log(error);
      callback(error, -1);
      return;
    }

    if(results[0] !== undefined){
      if(password == results[0].password){
        callback(false, {
          id:results[0].id,
          rights:results[0].rights});
      }else{
        callback(2, -1);
      }
    }else{
      callback(1, -1);
    }

  });
};

exports.getUserDataById = function(id, callback){
  connection.query('SELECT fullname, gold FROM User WHERE id=?', [id], function(error, results, fields) {
    if (error){
      console.log(error);
      callback(error, {
        name:"???",
        gold:0
      });
      return;
    }

    if(results[0] !== undefined){
      callback(false, {
        name:results[0].fullname,
        gold:results[0].gold
      });
    }else{
      callback("User not found!", {
        name:"???",
        gold:0
      });
    }
  });
};

exports.getInventoryById = function(id, callback){

  connection.query('SELECT Item.id, name, description, weight, value FROM Inventory, Item WHERE Inventory.item_id = Item.id AND Inventory.user_id = ?', id, function(err, results, fields){
    if(err){
      console.log(err);
      callback(err, []);
    }else{
      callback(false, results);
    }
  });

};

exports.createUser = function(username, password, realname, callback){

  var post = {
    username : username,
    password : password,
    fullname : realname,
    gold : 0
  };

  connection.query('INSERT INTO User SET ?', post, function(err, result) {
    if (err){
      console.log(err);
      callback(err);
      return;
    }

    callback(undefined);
  });
};

exports.getItems = function(callback){
  connection.query('SELECT id, name, description, weight, value FROM Item', [], function(err, results, fields){
    if(err){
      console.log(err);
      callback(err, []);
    }else{
      callback(false, results);
    }
  });
};

exports.getUsers = function(callback){
  connection.query('SELECT id, username, fullname, gold, rights FROM User', [], function(err, results, fields){
    if(err){
      console.log(err);
      callback(err, []);
    }else{
      callback(false, results);
    }
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

exports.giveItem = function(userId, itemId, callback){
  var post = {
    user_id : userId,
    item_id : itemId,
  };

  connection.query('INSERT INTO Inventory SET ?', post, function(err, result) {
    if (err){
      console.log(err);
      callback(err);
      return;
    }

    callback(undefined);
  });
};
