var express = require('express');
var controllers = require('../controllers');
var sitemanager = controllers.sitemanager;
var accountmanager = controllers.accountmanager;
var usermanager = controllers.usermanager;
var roommanager = controllers.roommanager;
var router = express.Router();

module.exports = function(passport) {

  // site pages
  router.get('/',                       sitemanager.home);

  // account authentication
  router.get('/signup',                 accountmanager.signup);
  router.get('/signin',                 accountmanager.signin);
  router.get('/signout',                accountmanager.signout);
  router.get('/resetpass',              accountmanager.resetpass);
  router.post('/signup',                accountmanager.onsignup);
  router.post('/signin',                accountmanager.onsignin);

  // user api routes
  router.get('/users/search',           usermanager.getUsersByName);
  router.get('/users/online',           usermanager.getUsersByOnline);
  router.get('/users',                  usermanager.getUsersByOnline);
  router.put('/users/:uid',             usermanager.updateUser);
  router.get('/users/:uid',             usermanager.getUser);
  router.get('/users/:uid/subs',        usermanager.getUserSubscriptions);
  router.get('/users/:uid/notes',       usermanager.getUserNotifications);

  // room api routes
  router.post('/rooms',                 roommanager.createRoom);
  router.put('/rooms/:rid',             roommanager.updateRoom);
  router.post('/rooms/:rid',            roommanager.getRoom);
  router.get('/rooms/:rid/users',       roommanager.getRoomUsers);
  router.get('/rooms/:rid/invitations', roommanager.getRoomInvitations);
  router.get('/rooms/:rid/online',      roommanager.getUsersOnline);
  router.get('/rooms/search',           roommanager.getRoomsByName);

  return router;
};






