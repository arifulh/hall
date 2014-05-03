var db = require('../database');

exports.save = function(params, cb) {
    var multi = db.getMulti();
    db.increment('global', 'nextRid', function(err, rid) {
        params.rid = rid;
        multi
            .sadd('usubs:'+params.owneruid, rid)
            .sadd('rusers:'+rid, params.owneruid)
            .hset('rname:rid', params.rname, rid)
            .hmset('room:'+rid, params, function(err,res) { console.log(res) })
            .exec(function(err, replies) { cb(err, params); })
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
    db.addSetMember('rinvites:'+params.rid, params.rusers, function(err, res) {
        cb(err, res);
    });
}

exports.removeInvitation = function(params, cb) {
    db.remSetMember('rinvites:'+params.rid, params.rusers, function(err, res) {
        cb(err, res);
    });
}

exports.addTracks = function(params, cb) {
    db.prependListMembers('rtracks:'+params.rid, params.rtracks, function(err, res) {
        cb(err, res);
    });
}

exports.removeTrack = function(params, cb) {
    var track = params.rtracks ? params.rtracks[0] : null;
    if (!track) cb(null, { msg: 'no track provided' });
    db.remListMember('rtracksrem:'+params.rid, 0, track, function(err, res) {
        cb(err, res);
    });
}

exports.gotoNextTrack = function(params, cb) {
    var source = 'rtracks:'+params.rid, destination = source;
    db.cycleListMembers(source, destination, function(err, res) {
        cb(err, res);
    });
}

exports.getTracks = function(params, cb) {
    var tstart = 0, tend = 25;
    db.getListMemberRange('rtracks:'+params.rid, tstart, tend, function(err, res) {
        cb(err, res);
    });
}






