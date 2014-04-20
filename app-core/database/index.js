var redisClient = require('./redis-client');

exports.getField = function(key, field, callback) {
    redisClient.hget(key, field, callback);
};

exports.setField = function(key, field, value, callback) {
    redisClient.hset(key, field, value, callback);
};

exports.getFields = function(key, callback) {
    redisClient.hgetall(key, callback);
};

exports.setFields = function(key, data, callback) {
    redisClient.hmset(key, data, function(err, res) {
        if(typeof callback === 'function') { callback(err, res); }
    });
};

exports.getMultiFields = function(keys, callback) {
    var multi = redisClient.multi();
    for(var x=0; x<keys.length; ++x) { multi.hgetall(keys[x]); }
    multi.exec(callback);
};

exports.getKeys = function(key, callback) {
    redisClient.hkeys(key, callback);
};

exports.getValues = function(key, callback) {
    redisClient.hvals(key, callback);
};

exports.isField = function(key, field, callback) {
    redisClient.hexists(key, field, function(err, exists) {
        callback(err, exists === 1);
    });
};

exports.deleteField = function(key, field, callback) {
    redisClient.hdel(key, field, callback);
};

exports.increment = function(key, field, callback) {
    redisClient.hincrby(key, field, 1, callback);
};

exports.decrement = function(key, field, callback) {
    redisClient.hincrby(key, field, -1, callback);
};

exports.incrementBy = function(key, field, value, callback) {
    redisClient.hincrby(key, field, value, callback);
};
