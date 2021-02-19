const validator = require('validator');

export default class Login {
  constructor(formClass){
    this.form = document.querySelector(formClass);
  }
  
  init(){
    this.events();
  }

  events(){
    if(!this.form) return;
    console.log(this.form)

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e){
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    const errorEmail = document.querySelector('.error-email');
    const errorPassword = document.querySelector('.error-password');
    let error;

    if (!validator.isEmail(emailInput.value)) {
      errorEmail.innerHTML = 'E-mail inválido!';
      error = true;
    }else{
      errorEmail.innerHTML = '';
    }

    if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
      errorPassword.innerHTML = 'A senha precisa ter entre 3 e 50 caractéres!';    
      error = true;
    }

    console.log('chegou')
    if (!error) el.submit();
  }
}