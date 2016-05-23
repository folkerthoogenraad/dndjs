/**
 * Creates and maintains dungeons and loot (mainly loot actually).
*/
module.exports = function(app, db, keys){
  app.get('/dungeon/loot', function(req, res){
    res.end("[]");
  });
};
