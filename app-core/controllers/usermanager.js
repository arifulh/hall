var User = require('../models').User;

exports.createUser = function(req, res, next) {

}

exports.updateUser = function(req, res, next) {

}

exports.getUser = function(req, res, next) {
    User.getById(req.params, res.tojson);
}

exports.getUserSubscriptions = function(req, res, next) {
    User.getSubsById(req.params, res.tojson);
}

exports.getUserNotifications = function(req, res, next) {
    User.getNotesById(req.params, res.tojson);
}

exports.getUsersByOnline = function(req, res, next) {
    User.findUsers(res.tojson);
};

exports.getUsersByName = function(req, res, next) {

}

