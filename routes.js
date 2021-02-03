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
const transacoesController = require('./src/controllers/transacoesController')

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

// DESPESAS 
route.get('/despesas/index/:id', globalMiddleware.loginRequired, despesaController.index);
route.get('/despesas/registrar/index', globalMiddleware.loginRequired, despesaController.indexRegister);
route.post('/despesas/registrar/index', globalMiddleware.loginRequired, despesaController.send);

// RECEITAS 
route.get('/receitas/index/:id', globalMiddleware.loginRequired, receitaController.index);
route.get('/receitas/registrar/index', globalMiddleware.loginRequired, receitaController.indexRegister);
route.post('/receitas/registrar/index', globalMiddleware.loginRequired, receitaController.send);

route.get('/overview/index/:id', globalMiddleware.loginRequired, overviewController.index);

route.get('/transacoes/index/:id', globalMiddleware.loginRequired, transacoesController.index);

route.get('/api/overview/chart',  globalMiddleware.loginRequired, globalMiddleware.chartData)

module.exports = route;