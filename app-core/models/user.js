var db = require('../database');

exports.create = function(params, cb) {
    db.increment('global', 'nextUid', function(err, uid) {
        params.uid = uid;
        db.setFields('user:'+uid, params, function(err,res) {
            db.setFields('user:' + uid, 'username', params.username);
            db.setFields('user:' + uid, 'email', params.email);
            db.setFields('user:' + uid, 'password', params.password);
            db.setFields('uid:username', uid, params.username);
            db.setFields('email:uid', params.email, uid);
            cb(params);
        });
    });
};