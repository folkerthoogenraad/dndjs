/**
 * Creates and maintains dungeons and loot (mainly loot actually).
*/

var currentLoot = [];

module.exports = function(app, db, keys){

  app.get('/dungeon/events', function(req, res){
    //Checks
    if(!req.user.requireLogin()){
      return;
    }

    var events = [];
    if(currentLoot.length > 0){
      events.push("loot");
    }
    //add other event stuff
  });

  app.get('/dungeon/loot', function(req, res){

    //Checks
    if(!req.user.requireLogin()){
      return;
    }

    //Actual code
    res.end(JSON.stringify(currentLoot));
  });

  app.post('/dungeon/loot', function(req, res){

    //Checks
    if(!req.user.requireAdmin){
      return;
    }

    //Actual code
    

  });
};
