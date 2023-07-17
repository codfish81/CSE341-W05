const { error } = require('console');
const express = require('express');
const passport = require('passport');
const routes = express.Router();

routes.get('/google', passport.authenticate('google', {scope: ['profile']}))

routes.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
(req, res) => {
    res.redirect('/dashboard')
})

routes.get('/logout', (req, res, next) => {
    req.logout((error) =>{
        if(error){
            return next(error)}
            res.redirect('/')
    })
})

//routes.use('/', require('./swagger'))
routes.use('/players', require('./player'));
routes.use('/teams', require('./team'));

module.exports = routes;