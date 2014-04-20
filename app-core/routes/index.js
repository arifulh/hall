var express = require('express');
var controllers = require('../controllers');
var router = express.Router();

router.get('/', controllers.home);

require('./debug')(router);
require('./admin')(router);
require('./users')(router);
require('./rooms')(router);
module.exports = router;




