var redisClient = require('./redis-client');
var db = {};

db.setObject = function(key, data, callback) {
    // TODO: this crashes if callback isnt supplied -baris
    redisClient.hmset(key, data, function(err, res) {
        if(typeof callback === 'function') {
            callback(err, res);
        }
    });
};

db.setObjectField = function(key, field, value, callback) {
    redisClient.hset(key, field, value, callback);
};

db.getObject = function(key, callback) {
    redisClient.hgetall(key, callback);
};

db.getObjects = function(keys, callback) {
    var multi = redisClient.multi();

    for(var x=0; x<keys.length; ++x) {
        multi.hgetall(keys[x]);
    }

    multi.exec(callback);
};

db.getObjectField = function(key, field, callback) {
    db.getObjectFields(key, [field], function(err, data) {
        if(err) {
            return callback(err);
        }

        callback(null, data[field]);
    });
};

db.getObjectFields = function(key, fields, callback) {
    db.getObjectsFields([key], fields, function(err, results) {
        callback(err, results ? results[0]: null);
    });
};

db.getObjectsFields = function(keys, fields, callback) {
    var multi = redisClient.multi();

    for(var x=0; x<keys.length; ++x) {
        multi.hmget.apply(multi, [keys[x]].concat(fields));
    }

    function makeObject(array) {
        var obj = {};

        for (var i = 0, ii = fields.length; i < ii; ++i) {
            obj[fields[i]] = array[i];
        }
        return obj;
    }

    multi.exec(function(err, results) {
        if (err) {
            return callback(err);
        }

        results = results.map(makeObject);
        callback(null, results);
    });
};

db.getObjectKeys = function(key, callback) {
    redisClient.hkeys(key, callback);
};

db.getObjectValues = function(key, callback) {
    redisClient.hvals(key, callback);
};

db.isObjectField = function(key, field, callback) {
    redisClient.hexists(key, field, function(err, exists) {
        callback(err, exists === 1);
    });
};

db.deleteObjectField = function(key, field, callback) {
    redisClient.hdel(key, field, callback);
};

db.incrObjectField = function(key, field, callback) {
    redisClient.hincrby(key, field, 1, callback);
};

db.decrObjectField = function(key, field, callback) {
    redisClient.hincrby(key, field, -1, callback);
};

db.incrObjectFieldBy = function(key, field, value, callback) {
    redisClient.hincrby(key, field, value, callback);
};

module.exports = db;