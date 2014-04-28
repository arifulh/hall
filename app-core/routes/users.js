var db = require('../database');
var models = require('../models');
var controllers = require('../controllers');
var usermanager = controllers.usermanager;

module.exports = function(router) {
    router.get('/users/search',             usermanager.getUsersByName);
    router.get('/users/online',             usermanager.getUsersByOnline);
    router.get('/users',                    usermanager.getUsersByOnline);
    router.post('/users',                   usermanager.createUser);
    router.put('/users/:uid',               usermanager.updateUser);
    router.get('/users/:uid',               usermanager.getUser);
    router.get('/users/:uid/subs',          usermanager.getUserSubscriptions);
    router.get('/users/:uid/notes',         usermanager.getUserNotifications);
    return router;
}

