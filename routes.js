/*
 * A ROTA ESCOLHE O CONTROLLER, 
 * E O CONTROLLER ESCOLHE O MODEL E A VIEW QUE VAI RENDERIZAR 
 */

const express = require('express');
const route = express.Router();

// IMPORTAÇÃO DE CONTROLLERS
const homePageController = require('./src/controllers/homePageController')
const registerController = require('./src/controllers/registerController')
const loginController = require('./src/controllers/loginController')
const despesaController = require('./src/controllers/despesaController')
const receitaController = require('./src/controllers/receitaController')
const overviewController = require('./src/controllers/overviewController')

const globalMiddleware = require('./src/middlewares/globalMiddleware')

// CONTROLADOR DE ROTAS
route.get('/', homePageController.homePageController);
route.post('/', homePageController.homePagePost);

route.get('/login/index', loginController.index);
route.post('/login/index', loginController.send);
route.get('/login/logged', loginController.logged);
route.get('/login/logout', loginController.logout);

route.get('/register/index', registerController.index);
route.post('/register/index', registerController.send);

route.get('/despesas/index', globalMiddleware.loginRequired, despesaController.index);
route.post('/despesas/index', globalMiddleware.loginRequired, despesaController.send);

route.get('/receitas/index', globalMiddleware.loginRequired, receitaController.index);
route.post('/receitas/index', globalMiddleware.loginRequired, receitaController.send);

route.get('/overview/index', globalMiddleware.loginRequired, overviewController.index);

module.exports = route;