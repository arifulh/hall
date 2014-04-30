var _ = require('lodash');
var bcrypt = require('bcryptjs');
var db = require('../database');

var hashPassword = function(password, cb) {
    if (!password) { return cb(null, password); }
    bcrypt.genSalt(12, function(err, salt) {
        if (err) { return cb(err); }
        bcrypt.hash(password, salt, cb);
    });
};

exports.save = function(params, cb) {
    db.increment('global', 'nextUid', function(err, uid) {
        hashPassword(params.password, function(err, hash) {
            if(err) { return cb(err); }
            params.password = hash;
            params.uid = uid;
            params.id = uid;
            db.getMulti()
                .sadd('subs:'+uid, null)
                .sadd('notes:'+uid, null)
                .hset('uname:uid', params.uname, uid)
                .hset('email:uid', params.email, uid)
                .hset('email:uid', params.email, uid)
                .hmset('user:'+uid, params)
                .exec(function(err, replies) {
                    delete params.password;
                    cb(err, params);
                })
        });
    });
};

exports.getById = function(params, cb) {
    db.getFields('user:'+params.uid, ['uid', 'uname', 'email'], function(err, res) {
        var user = { id: res[0], uid: res[0], uname: res[1], email: res[2] };
        cb(err, user);
    });
};

exports.findByEmail = function(params, cb) {
    db.getAllFields('email:uid', function(error,results) {
        var email = _.find(_.keys(results), function(e){ return e == params.email; });

        if (email) {
            var userKey = 'user:'+results[params.email];
            db.getFields(userKey, ['uid', 'uname', 'email', 'password'], function(err, res) {
                var user = { id: res[0], uid: res[0], uname: res[1], email: res[2], password: res[3] };
                return cb(null, user);
            });
        } else {
            return cb(null, null);
        }
    });
};


exports.getRoomUsers = function(params, cb) {
    db.getSetMembers('subs:'+params.uid, function(err, res) {
        cb(err, { uid: params.uid, subs: res });
    })
};

exports.getNotesById = function(params, cb) {
    db.getSetMembers('notes:'+params.uid, function(err, res) {
        cb(err, { uid: params.uid, notes: res });
    })
};

exports.addSub = function(params, cb) {
    db.addSetMember('subs:'+params.uid, params.subs, function(err, res) {
        cb(err, res);
    });
}

exports.addNotification = function(params, cb) {
    db.addSetMember('notes:'+params.uid, params.subs, function(err, res) {
        cb(err, res);
    });
}

exports.removeSub = function(params, cb) {
    db.remSetMember('subs:'+params.uid, params.subs, function(err, res) {
        cb(err, res);
    });
}

exports.removeNotification = function(params, cb) {
    db.remSetMember('notes:'+params.uid, params.subs, function(err, res) {
        cb(err, res);
    });
}

exports.findUsers = function(cb) {
    db.getValues('uname:uid', function(err,res) {
        var all = _.map(res, function(i) { return 'user:'+i; }), users = [];
        db.getMultiFields(all, ['uid', 'uname', 'email'], function(err2, res2) {
            var users = _.map(res2, function(i) { return { uid: i[0], uname: i[1] } });
            cb(err2, users);
        });
    });
};



