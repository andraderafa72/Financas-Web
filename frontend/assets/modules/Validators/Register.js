const validator = require('validator');

export default class Register{
  constructor(formClass){
    this.form = document.querySelector(formClass);
  }

  init(){
    this.events();
  }

  events(){
    if(!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e){
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    const repeatPasswordInput = el.querySelector('input[name="repeat-password"]');
    const nameInput = el.querySelector('input[name="nome"]');
    const errorEmail = document.querySelector('.error-register-email');
    const errorPassword = document.querySelector('.error-register-password');
    const errorRepeatPassword = document.querySelector('.error-repeat-password');
    const errorName = document.querySelector('.error-name');
    let error;

    // VALIDA O TAMANHO DA SENHA E DO NOME
    if (nameInput.value.length < 2 || nameInput.value.length >= 50) {
      errorName.innerHTML = 'O nome precisa ter entre 2 e 50 caractéres!';
      error = true;
    } else {
      errorName.innerHTML = ''
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length >= 50) {
      errorPassword.innerHTML = 'A senha precisa ter entre 3 e 50 caractéres!';
      error = true;
    } else {
      errorPassword.innerHTML = ''
    }

    if(passwordInput.value !== repeatPasswordInput.value){
      errorRepeatPassword.innerHTML = 'As senhas precisam ser iguais!';
      error = true;
    } else {
      errorRepeatPassword.innerHTML = ''
    }

    if (!validator.isEmail(emailInput.value)) {
      errorEmail.innerHTML = 'E-mail inválido!';
      error = true;
    } else {
      errorEmail.innerHTML = ''
    }
    if (!error) el.submit();

  }
}