var db = require('../database');
var User = require('../models').User;
var primusExpressSession = require('primus-express-session');

module.exports = function(primus) {
    primus.use('session', primusExpressSession);

    primus.on('connection', function(spark) {

      spark.getSession(function(err, session) {
        User.getById({ uid: session.passport.user }, function(err, user) {
          console.log(user)
        });
      });

      spark.on('data', function(data) {

      });
    });
};