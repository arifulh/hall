var db = require('./database');
var external = require('./external');
var users = require('./users');
var rooms = require('./rooms');

var CONST_PRIVATE_FIELDS = ['password', 'user'];
var CONST_PUBLIC_FIELDS = ['email', 'username'];
var CONST_ALL_FIELDS = CONST_PRIVATE_FIELDS.concat(CONST_PUBLIC_FIELDS);


function keys(fields, uid) {
    return (fields.map(function(f, i) { return f+':'+uid }));
}

function hash(pass) {
    return pass;
};

exports.createNewUser = function(params, cb) {
    db.incrObjectField('global', 'nextUid', function(err, uid) {
        params.uid = uid;
        db.setObject('user:'+uid, params, function(err,res) {
            db.setObjectField('user:' + uid, 'username', params.username);
            db.setObjectField('user:' + uid, 'email', params.email);
            db.setObjectField('user:' + uid, 'password', params.password);
            db.setObjectField('uid:username', uid, params.username);
            db.setObjectField('email:uid', params.email, uid);
            cb(params);
        });
    });
};

exports.setUserFields = function(fields, uid, values, cb) {
    keys(fields, uid).forEach(function(key, index) {
        db.setObject(key, values[index], cb);
    });
};

exports.getUsersFields = function(fields, uid, cb) {
    if (fields === 'ALL') fields = CONST_ALL_FIELDS;
    db.getObjectKeys(['uid:username'],function(err, uids) {
         uids = uids.map(function(i) { return ('user:'+i); });
        db.getObjectsFields(uids, ['uid', 'username', 'email'], function(err, users) {
            console.log(uids)
            cb(users)
        })

    })
};

exports.getUserFields = function(fields, uid, cb) {
    db.getObjectFields('user:'+uid, CONST_PUBLIC_FIELDS, function(err, hash) {
        cb(hash);
    })
};

exports.getUserPublicFields = function(fields, uid, cb) {
    if (fields === 'PUBLIC' || !fields) {
        db.getObjectFields('user:'+uid, CONST_PUBLIC_FIELDS, function(err, hash) {
            cb(hash);
        })
    }
};

exports.getUserProfile = function(uid, cb) {
    var fields = CONST_PUBLIC_FIELDS;
    exports.getUserFields(fields, req.params.uid, function(results){

    });
};

exports.getUsersSet = function(set, start, end, cb) {
    db.getSortedSetRevRange(set, start, end, function(uids) {
        cb(this.getFields(uids));
    });
};

exports.getUsersOnline = function(cb) {
    db.getObject('username:uid', function(hash) {
        var uids = Object.keys(hash), users = [];
        if (this.getField('online', uid)) users.push(uid);
        cb(users);
    });
};

exports.searchUsersByName = function(name, cb) {
    db.getObject('username:uid', function(hash) {
        var uids = Object.keys(hash);
        this.getUser(uids, cb);
    });
};


