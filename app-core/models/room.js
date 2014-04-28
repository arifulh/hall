var db = require('../database');

exports.create = function(params, cb) {
    var multi = db.getMulti();
    db.increment('global', 'nextRid', function(err, rid) {
        params.rid = rid;
        multi
            .sadd('rusers:'+rid, null)
            .sadd('rinvites:'+rid, null)
            .hset('rname:rid', params.rname, rid)
            .hmset('room:'+rid, params, function(err,res) { console.log(res) })
            .exec(function(err, replies) { cb(err, replies); })
    });
};

exports.getById = function(params, cb) {
    db.getFields('room:'+params.rid, ['rid', 'rname'], function(err, res) {
        var room = { rid: res[0], rname: res[1] };
        cb(err, room);
    })
};

exports.getUsers = function(params, cb) {
    db.getSetMembers('rusers:'+params.rid, function(err, res) {
        cb(err, { rid: params.rid, rusers: res });
    })
};

exports.getOnine = function(params, cb) {
    db.getSetMembers('rusers:'+params.rid, function(err, res) {
        cb(err, { rid: params.rid, rusers: res });
    })
};

exports.getInvitations = function(params, cb) {
    db.getSetMembers('rinvites:'+params.rid, function(err, res) {
        cb(err, { rid: params.rid, rinvites: res });
    })
};

exports.addUser = function(params, cb) {
    db.addSetMember('rusers:'+params.rid, params.rusers, function(err, res) {
        cb(err, res);
    });
}

exports.removeUser = function(params, cb) {
    db.remSetMember('rusers:'+params.rid, params.rusers, function(err, res) {
        cb(err, res);
    });
}

exports.addInvitation = function(params, cb) {
    db.remSetMember('rinvites:'+params.rid, params.rusers, function(err, res) {
        cb(err, res);
    });
}

exports.removeInvitation = function(params, cb) {
    db.remSetMember('rinvites:'+params.rid, params.rusers, function(err, res) {
        cb(err, res);
    });
}


