/**
 * The item and inventory endpoints defined here.
*/
module.exports = function(app, db, keys){

  app.get('/users/me/inventory', function(req, res){

    //Checks
    if(!req.query.key){
      res.status(400).send("No key specified");
      return;
    }

    var userID = keys.getUserId(req.query.key);

    if(!userID){
      res.status(400).send("Invalid key");
      return;
    }

    //Actual code
    db.getInventoryById(userID, function(error, inventory){
      if(error){
        res.status(500).send("Internal server error.");
      }
      res.end(JSON.stringify(inventory));
    });
  });

  app.get('/items', function(req, res){

    //Checks
    if(!req.query.key){
      res.status(400).send("No key specified");
      return;
    }

    var userID = keys.getUserId(req.query.key);

    if(!userID){
      res.status(400).send("Invalid key");
      return;
    }

    if(!keys.isAdmin(userID)){
      res.status(403).send("Unauthorized, you need to be admin for this");
      return;
    }

    //Actual code


  });

  app.put('/items', function(req, res){

    //Checks
    if(!req.query.key){
      res.status(400).send("No key specified");
      return;
    }

    var userID = keys.getUserId(req.query.key);

    if(!userID){
      res.status(400).send("Invalid key");
      return;
    }

    if(!keys.isAdmin(userID)){
      res.status(403).send("Unauthorized, you need to be admin for this");
      return;
    }

    //Actual code
    


  });

};
