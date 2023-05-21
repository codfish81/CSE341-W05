const express = require('express');
const routes = express.Router();

const myController = require('../controllers/team');

routes.get('/', myController.getAllTeams)
routes.get('/:id', myController.getSingleTeam);
routes.post('/', myController.createTeam);
routes.put('/:id', myController.updateTeam);
routes.delete('/:id', myController.deleteTeam);

module.exports = routes;