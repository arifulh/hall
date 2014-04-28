var db = require('../database');
var models = require('../models');
var controllers = require('../controllers');
var roommanager = controllers.roommanager;

module.exports = function(router) {
    router.post('/rooms',                 roommanager.createRoom);
    router.put('/rooms/:rid',             roommanager.updateRoom);
    router.post('/rooms/:rid',            roommanager.getRoom);
    router.get('/rooms/:rid/users',       roommanager.getRoomUsers);
    router.get('/rooms/:rid/invitations', roommanager.getRoomInvitations);
    router.get('/rooms/:rid/online',      roommanager.getUsersOnline);
    router.get('/rooms/search',           roommanager.getRoomsByName);
    return router;
}

