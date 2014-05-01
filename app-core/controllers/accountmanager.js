var passport = require('passport');
var db = require('../database');
var models = require('../models');

exports.signup = function(req, res, next) {
  var data = { title: 'Sign-up', user: req.user };
  res.render('signup', data);
}

exports.signin = function(req, res, next) {
  var data =  { user: req.user, title: 'Sign-in', user: req.user };
  res.render('signin', data);
}

exports.signout = function(req, res, next) {
  req.session.destroy(function (err) {
    req.logout();
    res.redirect('/');
  });
}

exports.resetpass = function(req, res, next) {
  var data = { title: 'home', user: req.user};
  res.render('index', data);
}

exports.onsignup = passport.authenticate('local-signup', {
    successRedirect : '/', failureRedirect : '/signup', failureFlash : false });

exports.onsignin = passport.authenticate('local-signin', {
    successRedirect : '/', failureRedirect : '/signin', failureFlash : false });