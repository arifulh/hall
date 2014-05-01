var express = require('express');
var path = require('path');
var debug = require('debug')('my-application');
var favicon = require('static-favicon');
var logger = require('morgan');
var csrf = require('csurf');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var Primus = require('primus');
var db = require('./database');

var RedisSessionStore = new RedisStore({
    host : '127.0.0.1',
    port : 6379
});

var app = express();

require('./passport-auth')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'keyboard cat',
    store : RedisSessionStore
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.tojson = function (err, results) { res.json(err || results); };
    next();
});

// app routes
app.use('/', require('./routes')(passport));


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = require('http').createServer(app);
var primus = new Primus(server, {
  transformer: 'websockets',
  session: {
    secret: 'keyboard cat',
    store: RedisSessionStore
  }
});


require('./pubsub')(primus);


server.listen(3000);


