const express = require('express');
const routes = express.Router();

routes.use('/', require('./swagger'))
routes.use('/players', require('./contacts'));
routes.use('/teams', require('./contacts'));
// routes.use(
//     '/',
//     (docData = (req, res) => {
//       let docData = {
//         documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
//       };
//       res.send(docData);
//     })
//   );

module.exports = routes;