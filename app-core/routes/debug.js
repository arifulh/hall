var _ = require('lodash');
var db = require('../database');
var models = require('../models');
var controllers = require('../controllers');
var user = models.user;

var routesMap = {
    'users': [],
    'rooms': [],
    'auth': [],
    'main': []
}

function generateSeedUser(res, seedParams) {
   user.create(seedParams, function(results) { res.json(results) });
}

function getRouteInfo(route, controller) {
    var r = {};
    r.path = route.path;
    r.method = _.first(route.stack).method;
    r.handler = _.first(route.stack).handle.name;
    r.controller = controller || 'main';
    return r;
}

module.exports = function(router) {

    // _.each(_.pluck(router.stack, 'route'), function(r) {
    //     var path = r.path.split('\/')[1];
    //     if (path === 'users') routesMap.users.push(getRouteInfo(r, 'usermanager'));
    //     else if (path === 'rooms') routesMap.rooms.push(getRouteInfo(r, 'roommanager'));
    //     else if (path === 'auth') routesMap.auth.push(getRouteInfo(r, 'authmanager'));
    //     else routesMap.main.push(getRouteInfo(r, 'main'));
    // })

    // router.get('/debug' , function(req, res) {
    //     var data = { routesMap: routesMap }
    //     res.render('debug', data);
    // });



    // router.get('/debug/email' , user.getByEmail);

    // // create seed users
    // router.get('/debug/seedusers', function(req, res) {
    //     for (var i=0;i<20; i++) {
    //         generateSeedUser(res, {
    //             uname: ('user'+i),
    //             email: ('user'+i+'@aol.com'),
    //             password: ('userPassword'+i)
    //         })
    //     }
    // });

    return router;
}