var db = require('../database');
var User = require('../models').User;
var primusExpressSession = require('primus-express-session');
var redis   = require('redis');
var pubsub  = require('node-internal-pubsub');
var redisClient = redis.createClient();
var redisSub = redis.createClient();
var pub = pubsub.createPublisher();

module.exports = function(primus) {

    redisSub.psubscribe('*');
    redisSub.on('pmessage', function(pattern, channel, msg) {
      pub.publish(channel, msg);
    });

    primus.use('session', primusExpressSession);

    primus.on('connection', function(spark) {

      spark.getSession(function(err, session) {
        User.getById({ uid: session.passport.user }, function(err, user) {

        });
      });

      var sub = pubsub.createSubscriber();
      sub.subscribe('chatmessages');

      // Send incoming messages to the user
      sub.on('message', function(channel, message) {
        message = JSON.parse(message);
        spark.write(message);
      });

      // Publish messages received from the user to redis
      spark.on('data', function(message) {
        message.timestamp = Date.now();
        redisClient.publish('chatmessages', JSON.stringify(message));
      });
    });



};















