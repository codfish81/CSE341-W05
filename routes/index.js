const express = require('express');
const routes = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth')

routes.get('/', ensureGuest, (req, res)=> {
    res.render('login', {layout: 'login'})
})

routes.get('/dashboard', /*ensureAuth,*/  (req, res)=> {
    res.render('dashboard')
})

//routes.use('/', require('./swagger'))
routes.use('/players', require('./player'));
routes.use('/teams', require('./team'));

module.exports = routes;