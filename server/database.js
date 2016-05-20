exports.getUserIdByNameAndPassword = function(name, password, callback){
  callback(1);
};

exports.getUserDataById = function(id, callback){
  callback({
    name:"Sicke burn",
    gold:14
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
