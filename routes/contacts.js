const express = require('express');
const routes = express.Router();

const myController = require('../controllers/index');

routes.get('/', myController.getAllPlayers);
routes.get('/', myController.getAllTeams)
routes.get('/:id', myController.getSinglePlayer);
routes.get('/:id', myController.getSingleTeam);
routes.post('/', myController.createPlayer);
routes.post('/', myController.createTeam);
routes.put('/:id', myController.updatePlayer);
routes.put('/:id', myController.updateTeam);
routes.delete('/:id', myController.deletePlayer);
routes.delete('/:id', myController.deleteTeam);

module.exports = routes;