var express = require('express');
var controllers = require('../controllers');
var router = express.Router();

// Middleware
// ==========
var authUser = controllers.middleware.authUser;
var authAdmin = controllers.middleware.authAdmin;
var verifyTrack = controllers.middleware.verifyTrack;
var forbidden = controllers.middleware.forbidden;

// Admin
// =========
// router.get('/admin',                     authAdmin, controllers.admin);
// router.get('/admin/signout',             authAdmin, controllers.signout);
// router.get('/admin/signin',              authAdmin, controllers.signin);
// router.get('/admin/rooms',               authAdmin, controllers.rooms.getAllRooms);
router.get('/admin/users',                  authAdmin, controllers.users.all);
router.post('/admin/users',                 authAdmin, controllers.users.create);
router.get('/admin/users/:uid',             authAdmin, controllers.users.fetch);


// Users
// ==========
router.get('/users',                        forbidden);
router.get('/users/:uid',                   authUser, controllers.users.profile);
// router.get('/users/:uid/subscriptions',  authUser, controllers.users.subscriptions);
// router.get('/users/online',              controllers.users.online);
// router.get('/users/:uid/alerts',         authUser, controllers.users.alerts);
// router.get('/users/search',              controllers.users.search);
// router.put('/users/:uid',                authUser, controllers.users.update)

// Rooms
// ==========
router.post('/rooms',                       authUser, controllers.rooms.createRoom);
// router.post('/rooms/:rid/messages',      authUser, controllers.rooms.addMessage);
// router.post('/rooms/:rid/tracks',        authUser, verifyTrack, controllers.rooms.addTrack);
// router.post('/rooms/:rid/tracks/skip',   authUser, controllers.rooms.skipTrack);
// router.post('/rooms/:rid/users',         authUser, controllers.rooms.addUser);
// router.put('/rooms/:rid/tracks',         authUser, controllers.rooms.updateTracks);
// router.get('/rooms/:rid',                authUser, controllers.rooms.getRoom);
// router.get('/rooms/:rid/users',          authUser, controllers.rooms.getAllUsers);
// router.get('/rooms/:rid/users/online',   authUser, controllers.rooms.getCurrentOnlineUsers);
// router.del('/rooms/:rid',                authUser, controllers.rooms.removeRoom);
// router.del('/rooms/:rid/users/:uid',     authUser, controllers.rooms.removeUser);
// router.del('/rooms/:rid/tracks/:tid',    authUser, controllers.rooms.removeTrack);
// router.get('/rooms/:rid/messages',       authUser, controllers.rooms.getAllMessages);
// router.get('/rooms/:rid/tracks',         authUser, controllers.rooms.getAllTracks);
// router.get('/rooms/:rid/tracks/current', authUser, controllers.rooms.getCurrentTrackInfo);
// router.get('/rooms/popular',             controllers.rooms.getAllPopular);
// router.get('/rooms/recent',              controllers.rooms.getAllRecent);
// router.get('/rooms/public',              controllers.rooms.getAllPublic);


// Site
// ==========
router.get('/',                             controllers.home);
// router.get('/signup',                    controllers.signup);
// router.get('/signin',                    controllers.signin);
// router.get('/signout',                   authUser, controllers.signout);
// router.get('/resestpass',                authUser, controllers.resestpass);


module.exports = router;




