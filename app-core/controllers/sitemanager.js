var db = require('../database');
var roommanager = require('./roommanager');


exports.home = function(req, res, next) {
  var data = { title: 'Popular', user: req.user };
  res.render('index', data);
}

exports.createRoom = function(req, res, next) {
  var data = { title: 'Create a Room', user: req.user };
  res.render('createroom', data);
}

exports.onCreate = function(req,res,next) {
    roommanager.createRoom(req, res, function(err, results) {
        res.redirect('/room/'+results.rid+'/'+results.rname);
    })
}

exports.getRoom = function(req, res, next) {
      var data = { title: req.params.rname, user: req.user, rid: req.params.rid };
      res.render('room', data);
}