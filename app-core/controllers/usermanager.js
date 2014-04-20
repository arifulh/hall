var db = require('../database');
var models = require('../models');
var roommanager = require('./roommanager');
var authmanager = require('./authmanager');
var user = models.user;

exports.createUser = function(req, res) {
    user.create(req.params, function(err, results) {
        res.json(results);
    });
};

exports.getUserById = function(req, res) {

};

exports.getUserSubs = function(req, res) {

};

exports.getUserAlerts = function(req, res) {

};

exports.getOnlineUsers = function(req, res) {

};

exports.searchUserName = function(req, res) {

};

exports.updateUser = function(req, res) {

};



