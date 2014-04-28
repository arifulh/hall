var db = require('../database');
var models = require('../models');
var roommanager = require('./roommanager');
var authmanager = require('./authmanager');
var room = models.room;

function createRoom(req, res) {
    room.create(req.params, res.tojson);
}

function updateRoom(req, res) {

}

function getRoom(req, res) {
    room.getById(req.params, res.tojson);
}

function getRoomUsers(req, res) {
    room.getUsers(req.params, res.tojson);
}

function getRoomInvitations(req, res) {
    room.getInvitations(req.params, res.tojson);
}

function getUsersOnline(req, res) {
    room.getOnine(req.params, res.tojson);
}

function getRoomsByName(req, res) {

};

exports.createRoom = createRoom;
exports.updateRoom = updateRoom;
exports.getRoom = getRoom;
exports.getRoomUsers = getRoomUsers;
exports.getRoomInvitations = getRoomInvitations;
exports.getUsersOnline = getUsersOnline;
exports.getRoomsByName = getRoomsByName;

