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
    if(!req.user.requireLogin()){
      return;
    }

    db.getUserDataById(req.user.id, function resultCallback(err, result){
      if(err){
        res.status(500).end("Internal server error");
        return;
      }

      res.end(JSON.stringify(result));
    });
  });

  /**
   * Creates a new user
  */
  app.post('/users', function(req, res){
    var username = req.query.username;
    var password = req.query.password;
    var realname = req.query.realname;

    if(!username) {res.status(400).end("No username specified"); return;}
    if(!password) {res.status(400).end("No password specified"); return;}
    if(!realname) {res.status(400).end("No realname specified"); return;}

    db.createUser(username, keys.hash(password), realname, function(err){
      if(err){
        res.status(409).end("Coudn't create user, does the username already exist?");
      }else{
        res.status(200).end("User created succesfully");
      }
    });

  });

};
