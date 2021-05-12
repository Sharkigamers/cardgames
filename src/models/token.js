'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.generateJWT = function (user) {
    return jwt.sign(user.toJSON(), config.jwt.secretToken, {
        expiresIn: 3600//s
    });
};

exports.requireAuth = function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (error, decryptToken, jwtError) {
        if (typeof (jwtError) === 'object') {
            return res.json({
                success: false,
                field: 'Authorization',
                message: jwtError.message
            });
        } else if (!error) {
            let token = req.header('Authorization').slice(4);
            if (!err && !result) {
                req.user = decryptToken;
                return next();
            } else
                general.response(res, err);
            };
    })(req, res, next);
};