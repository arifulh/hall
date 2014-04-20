var controllers = {};
var db = require('./../components/database');
var external = require('./external');
var middleware = require('./middleware');
var users = require('./users');
var rooms = require('./rooms');

controllers.users = users;
controllers.rooms = rooms;
controllers.external = external;
controllers.middleware = middleware;


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