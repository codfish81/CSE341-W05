const express = require('express');
const routes = express.Router();

const myController = require('../controllers/player');

routes.get('/', myController.getAllPlayers);
routes.get('/:id', myController.getSinglePlayer);
routes.post('/', myController.createPlayer);
routes.put('/:id', myController.updatePlayer);
routes.delete('/:id', myController.deletePlayer);

module.exports = routes;