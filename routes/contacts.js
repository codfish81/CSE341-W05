const express = require('express');
const routes = express.Router();

const myController = require('../controllers/index');

routes.get('/', myController.getAll);
routes.get('/:id', myController.getSingle);
routes.post('/', myController.createContact);
routes.put('/:id', myController.updateContact);
routes.delete('/:id', myController.deleteContact);

module.exports = routes;