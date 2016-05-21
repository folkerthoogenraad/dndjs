/**
 * The user endpoints defined here.
*/
module.exports = function(app, db, keys){

  app.get('/token', function(req, res){
    var username = req.query.username;
    var password = req.query.password;

    if(!username) {res.status(400).send("No username specified"); return;}
    if(!password) {res.status(400).send("No password specified"); return;}

    db.getUserIdByNameAndPassword(username, keys.hash(password), function(err, userID){
      if(err){
        res.status(403).send("Failed to log in.");
        return;
      }

      var key = keys.generateKey();

      keys.setUserId(key, userID);

      res.end(JSON.stringify({
        key:key
      }));

    });
  });
  

};
