/// VALIDATORS
import Login from './assets/modules/Validators/Login';
const login = new Login('.login-form');
login.init()

import Register from './assets/modules/Validators/Register';
const register = new Register('.register-form')
register.init();

import Transaction from './assets/modules/Validators/Transaction';
const receitas = new Transaction('.receitas-form')
receitas.init();

const despesas = new Transaction('.despesas-form')
despesas.init();

const editTransacao = new Transaction('.edit-form')
editTransacao.init();