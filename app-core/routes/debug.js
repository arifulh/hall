var db = require('../database');
var models = require('../models');
var controllers = require('../controllers');
var user = models.user;

function generateSeedUser(res, seedParams) {
   user.create(seedParams, function(results) { res.json(results) });
}

module.exports = function(router) {

    // create users
    router.post('/debug/users', function(req, res) {
        for (var i=0;i<20; i++) {
            generateSeedUser(res, {
                username: ('user'+1),
                email: ('user'+1+'@aol.com'),
                password: ('userPassword'+1)
            })
        }
    });

    return router;
}