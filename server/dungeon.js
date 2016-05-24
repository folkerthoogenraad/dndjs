/**
 * Creates and maintains dungeons and loot (mainly loot actually).
*/

var currentLoot = [];

module.exports = function(app, db, keys){

  app.get('/dungeon/events', function(req, res){
    //TODO checks
    var events = [];
    if(currentLoot.length > 0){
      events.push("loot");
    }
    //add other event stuff
  });

  app.get('dungeon/loot', function(req, res){
    //TODO checks
    res.end(currentLoot);
  });
};
