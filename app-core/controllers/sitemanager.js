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
    if (!req.user) return res.redirect('/signin');
    roommanager.createRoom(req, res, function(err, results) {
        res.redirect('/r/'+results.rid+'/'+results.rname);
    })
}

exports.getRoom = function(req, res, next) {
    roommanager.getRoom(req, res, function(err, results) {
      if (results.rid) return res.render('room', { title: results.rname, user: req.user, rid: results.rid });
      return res.render('room', { title: 'Room does not exist', user: req.user, rid: null })
    });
}