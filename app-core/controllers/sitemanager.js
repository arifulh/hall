var db = require('../database');

exports.home = function(req, res, next) {
  var data = { title: 'Popular', user: req.user };
  res.render('index', data);
}

exports.createRoom = function(req, res, next) {
  var data = { title: 'Create a Room', user: req.user };
  res.render('createroom', data);
}
