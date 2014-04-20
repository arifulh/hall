var db = require('../database');
var models = require('../models');
var controllers = require('../controllers');
var usermanager = controllers.usermanager;

module.exports = function(router) {
    router.post('/users',              usermanager.createUser);
    router.post('/users/:uid',         usermanager.getUserById);
    router.get('/users/:uid/subs',     usermanager.getUserSubs);
    router.get('/users/online',        usermanager.getOnlineUsers);
    router.get('/users/:uid/alerts',   usermanager.getUserAlerts);
    router.get('/users/search',        usermanager.searchUserName);
    router.put('/users/:uid',          usermanager.updateUser);
    return router;
}