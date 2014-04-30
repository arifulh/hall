var passport = require('passport');
var db = require('../database');
var models = require('../models');
var controllers = {};

function home(req, res, next) {
  var data = { title: 'home', user: req.user };
  res.render('index', data);
}

function signup(req, res, next) {
  var data = { title: 'Sign-up', user: req.user };
  res.render('signup', data);
}

function signin(req, res, next) {
  var data =  { user: req.user, title: 'Sign-in', user: req.user };
  res.render('signin', data);
}

function signout(req, res, next) {
  req.logout();
  res.redirect('/');
}

function resetpass(req, res, next) {
  var data = { title: 'home', user: req.user};
  res.render('index', data);
}

controllers.home = home;
controllers.signup = signup;
controllers.signin = signin;
controllers.signout = signout;
controllers.resetpass = resetpass;
controllers.authmanager = require('./authmanager');
controllers.usermanager = require('./usermanager');
controllers.roommanager = require('./roommanager');
controllers.middleware = require('./middleware');
module.exports = controllers;