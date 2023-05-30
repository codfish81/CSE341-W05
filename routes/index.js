const express = require('express');
const routes = express.Router();

routes.get('/', (req, res)=> {
    res.render('login')
})

routes.get('/dashboard', (req, res)=> {
    res.render('dashboard')
})

//routes.use('/', require('./swagger'))
routes.use('/players', require('./player'));
routes.use('/teams', require('./team'));

module.exports = routes;