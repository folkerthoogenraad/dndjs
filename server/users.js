/**
 * The user endpoints defined here.
*/
module.exports = function(app, db, keys){

  /**
   * Returns the infor for the current logged in
   * user. The logged in user is determened by
   * the given key.
  */
  app.get('/users/me', function(req, res){
    if(!req.query.key){
      res.status(400).send("No key specified");
      return;
    }

    var userID = keys.getUserId(req.query.key);

    if(!userID){
      res.status(400).send("Invalid key");
      return;
    }

    db.getUserDataById(userID, function resultCallback(err, result){
      if(err){
        res.status(500).send("Internal server error");
        return;
      }

      res.end(JSON.stringify(result));
    });
  });

  /**
   * Creates a new user
  */
  app.put('/users', function(req, res){
    var username = req.query.username;
    var password = req.query.password;
    var realname = req.query.realname;

    if(!username) {res.status(400).send("No username specified"); return;}
    if(!password) {res.status(400).send("No password specified"); return;}
    if(!realname) {res.status(400).send("No realname specified"); return;}

    

  });

};
