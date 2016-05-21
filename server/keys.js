var crypto = require('crypto');

var keys = [];

module.exports = {
  getUserId : function(key){
    return keys[key];
  },
  setUserId : function(key, id){
    //Delete the key for the user, if it already exists. This is O(n) sadly enough.
    keys.forEach(function(element, index, array){
      if(element == id){
        array[index] = undefined;
      }
    });

    keys[key] = id;
  },
  generateKey : function(){ //This is a GREAT way to generate stuff
    return (""+Math.random()).substring(2);
  },
  hash : function(input){
    return crypto.createHash('md5').update(input).digest('hex');
  }
};
