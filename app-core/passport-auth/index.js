var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models').User;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.getById({ uid: id }, function (err, user) { done(err, user); })
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findByEmail({ email :  email }, function(err, user) {
            if (err) return done(err);

            if (user) {
                return done(null, false, { message: 'That email is already taken.' });
            } else {
                User.save({
                  uname: req.body.uname,
                  password: req.body.password,
                  email: req.body.email
                }, function(err, newUser) {
                    if (err) return done(err);
                    return done(null, newUser);
                });
            }

        });
    }));


    passport.use('local-signin', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findByEmail({ email:  email }, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, { message: 'Incorrect email.' });
            bcrypt.compare(password, user.password, function(err, isValid) {
              if (err) { return done(err);  }
              if (!isValid) return done(null, false, { message: 'Incorrect password.' });
              return done(null, user);
            });
        });

    }));

};