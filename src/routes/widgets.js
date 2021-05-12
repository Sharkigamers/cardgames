'use strict'

const router = require('express').Router();
const {isAuthenticated} = require("../config/auth");
const User = require('../models/User');
const Client = require('../models/db');

router.post('/users/widgets/add', isAuthenticated,function (req, res) {
    console.log(req.body);
    const type = req.body.type;
    const param_1 = req.body.param_1;
    const param_2 = req.body.param_2;
    const param_3 = req.body.param_3;
    const param_4 = req.body.param_4;
    User.addWidget(Client, req.session.passport['user']['value'], type, param_1, param_2, param_3, param_4, (result) => {
        console.log(result.rows[0]);
        res.json({'id': result.rows[0].id});
    });
});

router.post('/users/widgets/update', isAuthenticated,function (req, res) {
    const type = req.body.type;
    const param_1 = req.body.param_1;
    const param_2 = req.body.param_2;
    const param_3 = req.body.param_3;
    const param_4 = req.body.param_4;
    const widgetId = req.body.id;
    User.updateWidget(Client, widgetId, req.session.passport['user']['value'], type, param_1, param_2, param_3, param_4, (result) => {
        res.json('OK');
    });
});

router.post('/users/widgets/remove', isAuthenticated,function (req, res) {
    console.log(req.body);
    const widgetId = req.body.id;
    User.removeWidget(Client, widgetId, req.session.passport['user']['value'], (result) => {
        res.json('OK');
    });
});

module.exports = router;