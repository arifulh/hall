var db = require('./../components/database');
var external = require('./../components/external');
var users = require('./../components/users');
var rooms = require('./../components/rooms');

exports.create = function(req, res) {
    var params = req.body;
    users.createNewUser(params, function(results) {
        return res.json(params);
    });
};


exports.fetch = function(req, res) {
    users.getUserFields([], req.params.uid, function(results){
        res.end(JSON.stringify(results));
    });
};

exports.all = function(req, res) {
    users.getUsersFields('ALL', req.params.uid, function(results){
        res.end(JSON.stringify(results));
    });
};

exports.profile = function(req, res) {
    users.getUserFields('PUBLIC', req.params.uid, function(results){
        res.end(JSON.stringify(results));
    });
};

exports.session = function(uid) {
    users.getUserFields(['session'], uid, function(err, results){
        res.json(results);
    });
};

exports.subscriptions = function(uid) {
    users.getUserFields(['subscriptions'], uid, function(err, results){
        res.json(results);
    });
};

exports.alerts = function(uid) {
    users.getUserFields(['alerts'], uid, function(err, results){
        res.json(results);
    });
};

exports.update = function(uid, fields, values) {
    users.setFields(fields, uid, values, function(err, results){
        res.json(results);
    });
};

exports.search = function(name) {
    return users.searchUsersByName(name, function(err, results) {
        res.json(results);
    });
};

exports.online = function() {
    users.getUsersOnline(function(err, results){
        res.json(results)
    });
};


