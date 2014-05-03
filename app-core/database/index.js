var redisClient = require('./redis-client');

exports.getMulti = function() {
    return redisClient.multi();
}

// List commands
// ==================

exports.appendListMembers = function(key, members, callback) {
    redisClient.rpush(key, member, callback);
};

exports.prependListMembers = function(key, member, callback) {
    redisClient.lpush(key, member, callback);
};

exports.popFirstListMember = function(key, callback) {
    redisClient.lpop(key, callback);
};

exports.popLastListMember = function(key, callback) {
    redisClient.rpop(key, callback);
};

exports.remListMember = function(key, count, val, callback) {
    redisClient.lrem(key, count, val, callback);
}

exports.setListMember = function(key, count, val, callback) {
    redilient.lset(key, count, callback);
}

exports.cycleListMembers = function(source, destination, callback) {
    redisClient.brpoplpush(source, destination, callback);
}

exports.getListMemberRange = function(key, start, end, callback) {
    redisClient.lrange(key, start, end, callback);
}

exports.getListLength = function(key, callback) {
    redisClient.llen(key, callback);
};

// Set commands
// ==================

exports.addSetMember = function(key, member, callback) {
    redisClient.sadd(key, member, callback);
};

exports.remSetMember = function(key, member, callback) {
    redisClient.srem(key, member, callback);
};

exports.getSetMembers = function(key, callback) {
    redisClient.smembers(key, callback);
};

exports.getSetIsMember = function(key, val, callback) {
    redisClient.sismember(key, val, callback);
};

// Hash commands
// ==================

exports.getField = function(key, field, callback) {
    redisClient.hget(key, field, callback);
};

exports.getFields = function(key, fields, callback) {
    redisClient.hmget(key, fields, callback);
};

exports.setField = function(key, field, value, callback) {
    redisClient.hset(key, field, value, callback);
};

exports.getAllFields = function(key, callback) {
    redisClient.hgetall(key, callback);
};

exports.setFields = function(key, data, callback) {
    redisClient.hmset(key, data, function(err, res) {
        if(typeof callback === 'function') { callback(err, res); }
    });
};

exports.getMultiAllFields = function(keys, callback) {
    var multi = redisClient.multi();
    for(var x=0; x<keys.length; ++x) { multi.hgetall(keys[x]); }
    multi.exec(callback);
};

exports.getMultiFields = function(keys, fields, callback) {
    var multi = redisClient.multi();
    for(var x=0; x<keys.length; ++x) { multi.hmget(keys[x], fields); }
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
