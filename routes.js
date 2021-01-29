/*
 * A ROTA ESCOLHE O CONTROLLER, 
 * E O CONTROLLER ESCOLHE O MODEL E A VIEW QUE VAI RENDERIZAR 
 */

const express = require('express');
const route = express.Router();

// IMPORTAÇÃO DE CONTROLLERS
const homePageController = require('./src/controllers/homePageController')

// CONTROLADOR DE ROTAS
route.get('/', homePageController.homePageController);
route.post('/', homePageController.homePagePost);

module.exports = route;