var express = require('express');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var controllers = require('../controllers');
var models = require('../models');
var user = models.user;
var router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.getById({ uid: id }, function (err, user) { console.log(user); done(err, user); })
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
        user.findByEmail({ email: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          bcrypt.compare(password, user.password, function(err, res) {
            if (err) { return done(err);  }
            if (!res) return done(null, false, { message: 'Incorrect password.' });
            return done(null, user);
          });
        });
    });
  }
));

router.get('/', controllers.home);
router.get('/signup', controllers.signup);
router.get('/signin', controllers.signin);

router.post('/signin',
  passport.authenticate('local', { failureRedirect: '/signin', failureFlash: false }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/signout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/resetpass', controllers.resetpass);
require('./admin')(router);
require('./users')(router);
require('./rooms')(router);
require('./debug')(router);

module.exports = router;




