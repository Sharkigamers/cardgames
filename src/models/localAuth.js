'use strict';

const passport = require('passport');
const Client = require('./db');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./User');

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function (req, username, password, done) {
        process.nextTick(function() {
            User.findOne(Client, username, done);
        });
    }
));

passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function (req, username, password, done) {
        process.nextTick(function() {
            User.saveUser(Client, username, password, username, username);
            User.findOne(Client, username, done);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;