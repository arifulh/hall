var request = require('request');
var db = require('../database');

function getGdata(ytid, cb) {
    if (!ytid) return false;
    var url = 'http://gdata.youtube.com/feeds/api/videos/' + ytid + '?v=2&alt=jsonc';
    request(url, function(req, res) {

         // if code == 200 then
         //      -- If successful response, decode JSON
         //      local decoded    = json.decode(data);
         //      local entry      = decoded["entry"];
         //      local permission = entry["yt$accessControl"][5]["permission"];

         //      -- If the song is not embeddable, do nothing (return false).
         //      if permission ~= "allowed" then return false end;

         //      -- If the song is valid, create a song object to be added.
         //      -- Also create a stanza for this new song to be sent to the room.
         //      local new_song   = create_song(entry);
         //      local playlist   = get_playlist(room);
         //      stanza:get_child("song", song_queue_xmlns)
         //        :tag("uuid"):text(new_song.uuid):up()
         //        :tag("slen"):text(new_song.slen):up()
         //        :tag("thumb"):text(new_song.thumb):up()
         //        :tag("title"):text(new_song.title):up()

         //      -- Insert our new song to the playlist. Broadcast this song
         //      -- to the room so that clients can "queue" the song on their
         //      -- end. Finally, "start" the playlist if it was empty before.
         //      t_insert(playlist, new_song);
         //      room:handle_to_room(origin, stanza);
         //      if (#playlist == 1) then play_song(playlist, room) end;

        cb(res.body);
    })
}

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






