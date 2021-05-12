'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Client = require('./db');
const User = require('./User');

passport.use(new GoogleStrategy({
        clientID: "495253590628-sceo1gtjhgh4t40nnsjhe51r78n296q9.apps.googleusercontent.com",
        clientSecret: "c0ifE0jscQUQ8NbhToYHMB0C",
        callbackURL: "http://localhost:8080/auth/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.tryFindOne(Client, profile.emails[0], profile.id, done);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;