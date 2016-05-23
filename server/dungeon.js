/**
 * Creates and maintains dungeons and loot (mainly loot actually).
*/
module.exports = function(app, db, keys){
  app.get('/dungeon/events', function(req, res){
    res.end(JSON.stringify([{
      type : 'loot',
      time : 60000,
      items : [{
        
      }]
    }]));
  });
};
