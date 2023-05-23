const express = require('express');
const routes = express.Router();

const myController = require('../controllers/team');
const validation = require('../middleware/validate');

routes.get('/', myController.getAllTeams)
routes.get('/:id', myController.getSingleTeam);
routes.post('/', validation.validateTeam, myController.createTeam);
routes.put('/:id', validation.validateTeam, myController.updateTeam);
routes.delete('/:id', myController.deleteTeam);

module.exports = routes;