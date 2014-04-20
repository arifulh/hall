var db = require('../database');
var models = require('../models');
var controllers = {};

controllers.authmanager = require('./authmanager');
controllers.usermanager = require('./usermanager');
controllers.roommanager = require('./roommanager');
controllers.middleware = require('./middleware');

controllers.home =  function(req, res, next) {
  var data = { title: 'home' };
  res.render('index', data);
};

controllers.signup = function(req, res, next) {

};

controllers.signin = function(req, res, next) {

};


controllers.signout = function(req, res, next) {

};


controllers.resetpass = function(req, res, next) {

};

module.exports = controllers;