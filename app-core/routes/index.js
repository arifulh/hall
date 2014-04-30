var express = require('express');
var controllers = require('../controllers');
var router = express.Router();

module.exports = function(passport) {

  router.get('/', controllers.home);
  router.get('/signup', controllers.signup);
  router.get('/signin', controllers.signin);
  router.get('/signout', controllers.signout);
  router.get('/resetpass', controllers.resetpass);

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : false
  }));

  router.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/',
    failureRedirect : '/signin',
    failureFlash : false
  }));

  require('./admin')(router);
  require('./users')(router);
  require('./rooms')(router);
  require('./debug')(router);

  return router;



};






