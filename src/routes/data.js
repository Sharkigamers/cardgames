'use strict'

const router = require('express').Router();
const {isAuthenticated} = require("../config/auth");
const User = require('../models/User');
const Client = require('../models/db');

router.get('/users/widgets', isAuthenticated,function (req, res) {
    User.getListWidgets(Client, req.session.passport['user']['value'], (result) => {
        console.log(result.rows);
        
        if (result.rows == undefined) {
            res.json({});
        } else 
            res.json(result.rows);
    });
});

router.get("/about.json", function(req, res) {
    const time = Math.floor(+new Date() / 1000);
    const data = {
        'client': {
            'host': req.ip,
        },
        'server': {
            'current_time': time,
            'services': [{
                'name': 'weather',
                'widgets': [{
                    'name': 'City weather',
                    'description': 'Display weather of a city',
                    'params': [{
                        'name': 'city',
                        'type': 'string'
                    }]
                }],
            } , {
                'name': 'Country covid',
                'widgets': [{
                    'name': 'Country covid',
                    'description': 'Display covid-19 informations about a country',
                    'params': [{
                        'name': 'country',
                        'type': 'string'
                    }]
                }]
            } , {
                'name': 'Zip code',
                'widgets': [{
                    'name': 'Zip Code info',
                    'description': 'Display zip code of a city of any country',
                    'params': [
                        {
                            'name': 'country',
                            'type': 'string'
                        },
                        {
                            'name': 'zipcode',
                            'type': 'string'
                    }]
                }]
            } , {
                'name': 'Youtube',
                'widgets': [{
                    'name': 'Youtube info',
                    'description': 'Display Youtube channel info',
                    'params': [{
                        'name': 'id',
                        'type': 'string'
                    }]
                }]
            } , {
                'name': 'Ip',
                'widgets': [{
                    'name': 'Ip address info',
                    'description': 'Display Ip address info',
                    'params': [{
                        'name': 'Ip',
                        'type': 'string'
                    }]
                }]
            } , {
                'name': 'Zip code',
                'widgets': [{
                    'name': 'Zip Code info',
                    'description': 'Display zip code of a city of any country',
                    'params': [
                        {
                            'name': 'type_1',
                            'type': 'string'
                        },
                        {
                            'name': 'amount',
                            'type': 'integer'
                        }, {
                            'name': 'type_2',
                            'type': 'string'
                    }]
                }]
            }]
        }
    };
    res.json(data);
});

module.exports = router;