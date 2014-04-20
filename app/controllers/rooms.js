var db = require('./../components/database');
var external = require('./external');
var users = require('./users');
var rooms = require('./rooms');

/**
 * Rooms
 */

exports.createRoom = function(req, res) {
    res.json(rooms.createRoom(config))
};

exports.removeRoom = function() {

};

exports.getRoom = function() {

};

exports.getAllPopular = function() {

};

exports.getAllRecent = function() {

};

exports.getAllPublic = function() {

};

/**
 * Users
 */

exports.getAllUsers = function() {

};

exports.getCurrentOnlineUsers = function() {

};

exports.addUser = function() {

};

exports.removeUser = function() {

};

/**
 * Messages
 */

exports.getAllMessages = function() {

};

exports.addMessage = function() {

};

/**
 * Tracks
 */

exports.getAllTracks = function() {

};

exports.getCurrentTrackInfo = function() {

};

exports.addTrack = function() {

};

exports.skipTrack = function() {

};

exports.updateTracks = function() {

};

exports.removeTrack = function() {

};
