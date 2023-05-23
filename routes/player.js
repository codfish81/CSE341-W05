const express = require('express');
const routes = express.Router();

const myController = require('../controllers/player');
const validation = require('../middleware/validate');

routes.get('/', myController.getAllPlayers);
routes.get('/:id', myController.getSinglePlayer);
routes.post('/', validation.validatePlayer, myController.createPlayer);
routes.put('/:id', validation.validatePlayer, myController.updatePlayer);
routes.delete('/:id', myController.deletePlayer);

module.exports = routes;