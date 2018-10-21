var friends = require('../data/friends.js');

module.exports = function(app) {

    // A GET route with the url /api/friends.
    // This will be used to display a JSON of all possible friends.
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // A POST routes /api/friends. This will be used to handle incoming survey results.
    // This route will also be used to handle the compatibility logic.
    app.post('/api/friends', function(req, res) {
       const userScore = req.body.scores.map(num => parseInt(num, 10))
       var closestFriend = {};
       var closestDiff = 40;
       for (var i=0; i < friends.length; i++) {
           var tempScore = friends[i].scores;
           var tempDiffTotal = 0;
           for (var j=0; j < tempScore.length; j++) {
               tempDiffTotal += Math.abs(tempScore[j] - userScore[j]);
           }
           if (tempDiffTotal < closestDiff) {
               closestDiff = tempDiffTotal;
               closestFriend = friends[i];
           }
       }
        res.send(closestFriend);
    });
}
