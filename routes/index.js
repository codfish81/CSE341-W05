const express = require('express');
const routes = express.Router();

routes.use('/', require('./swagger'))
routes.use('/players', require('./contacts'));
routes.use('/teams', require('./contacts'));

module.exports = routes;