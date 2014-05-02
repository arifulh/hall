var Room = require('../models').Room;

exports.createRoom = function(req, res, cb) {
    req.body.owneruid = req.user.uid;
    Room.save(req.body, function(err, results) {
        cb(err, results)
    });
}

exports.updateRoom = function(req, res, next) {

}

exports.getRoom = function(req, res, cb) {
    Room.getById(req.params, cb);
}

exports.getRoomUsers = function(req, res, next) {
    Room.getUsers(req.params, res.tojson);
}

exports.getRoomInvitations = function(req, res, next) {
    Room.getInvitations(req.params, res.tojson);
}

exports.getUsersOnline = function(req, res, next) {
    Room.getOnine(req.params, res.tojson);
}

exports.getRoomsByName = function(req, res, next) {

};
