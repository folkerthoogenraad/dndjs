/**
 * The item and inventory endpoints defined here.
*/
module.exports = function(app, db, keys){

  app.get('/users/me/inventory', function(req, res){

    //Checks
    if(!req.user.requireLogin()){
      return;
    }

    //Actual code
    db.getInventoryById(req.user.id, function(error, inventory){
      if(error){
        res.status(500).end("Internal server error.");
      }
      res.end(JSON.stringify(inventory));
    });
  });

  app.get('/items', function(req, res){

    //Checks
    if(!req.user.requireAdmin()){
      return;
    }

    //Actual code
    db.getItems(function(error, items){
      if(error){
        res.status(500).end("Internal server error.");
      }
      res.end(JSON.stringify(items));
    });

  });

  app.post('/items', function(req, res){
    //Checks
    if(!req.user.requireAdmin()){
      return;
    }

    //Actual code


  });

};
