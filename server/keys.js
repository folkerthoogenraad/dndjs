var crypto = require('crypto');

var keys = [];
var rights = []; //cache the rights

module.exports = {
  getUserId : function(key){
    return keys[key];
  },
  setUserId : function(key, id){
    //Delete the key for the user, if it already exists. This is O(n) sadly enough.
    for(var k in keys){
      if(keys[k] == id){
        delete keys[k];
      }
    }

    keys[key] = id;
  },
  generateKey : function(){ //This is a GREAT way to generate stuff
    return (""+Math.random()).substring(2);
  },
  setRights : function(id, r){
    rights[id] = r;
  },
  isAdmin : function(id){
    return rights[id] == "admin";
  },
  getRights : function(id){
    return rights[id];
  },
  hash : function(input){
    return crypto.createHash('md5').update(input).digest('hex');
  }
};
