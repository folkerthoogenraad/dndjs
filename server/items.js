/**
 * The item and inventory endpoints defined here.
*/
module.exports = function(app, db, keys){
  app.get('/users/me/inventory', function(req, res){
    if(!req.query.key){
      res.status(400).send("No key specified");
      return;
    }

    var userID = keys.getUserId(req.query.key);

    if(!userID){
      res.status(400).send("Invalid key");
      return;
    }

    db.getInventoryById(userID, function(error, inventory){
      if(error){
        res.status(500).send("Internal server error.");
      }
      res.end(JSON.stringify(inventory));
    });
  });
};
