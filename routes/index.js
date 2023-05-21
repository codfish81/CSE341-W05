const express = require('express');
const routes = express.Router();

routes.use('/', require('./swagger'))
routes.use('/players', require('./player'));
routes.use('/teams', require('./team'));

module.exports = routes;