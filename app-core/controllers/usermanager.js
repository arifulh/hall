var db = require('../database');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var roommanager = require('./roommanager');
var authmanager = require('./authmanager');
var user = models.user;



function createUser(req, res, next) {

}

function updateUser(req, res) {

}

function getUser(req, res) {
    user.getById(req.params, res.tojson);
}

function getUserSubscriptions(req, res) {
    user.getSubsById(req.params, res.tojson);
}

function getUserNotifications(req, res) {
    user.getNotesById(req.params, res.tojson);
}

function getUsersByOnline(req, res) {
    user.findUsers(res.tojson);
};

function getUsersByName(req, res) {

}

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUser = getUser;
exports.getUserSubscriptions = getUserSubscriptions;
exports.getUserNotifications = getUserNotifications;
exports.getUsersByName = getUsersByName;
exports.getUsersByOnline = getUsersByOnline;

