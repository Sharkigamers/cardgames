'use strict'

const router = require('express').Router();
const passportLocal = require('../models/localAuth.js');
const passportGoogle = require('../models/googleAuth.js');

router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', {failureRedirect: '/'}, function (err, user, info) {
        if (!user)
            res.json({success: false, message: info.message});
        else
            res.json(info);
    })(req, res, next);
});

router.post('/signup', function (req, res, next) {
    passportLocal.authenticate('local-signup', {failureRedirect: '/'}, function (err, user, info) {
        if (!user)
            res.json({success: false, message: info.message});
        else
            res.json({success: true});
    })(req, res, next);
});

// router.get('/login', function (req, res, next) {
//     passportLocal.authenticate('local-login', {failureRedirect: '/'}, function (err, user, info) {
//         if (!user)
//             res.json({success: false, message: info.message});
//         else
//             res.json(info);
//     })(req, res, next);
// });

router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/callback', passportGoogle.authenticate('google', { failureRedirect: '/' }), 
    function(req, res) {
        res.redirect('/board/home');
    }
);

module.exports = router;