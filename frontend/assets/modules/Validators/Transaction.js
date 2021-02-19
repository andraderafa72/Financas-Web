const validator = require('validator');

export default class Transaction{
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
    const identificadorInput = document.querySelector('input[name="identificador"]');
    const valorInput = document.querySelector('input[name="valor"]');
    const dataInput = document.querySelector('input[name="data"]');
    const categoriaInput = document.querySelector('input[name="categoria"]');
    const iconeInput = document.querySelectorAll('input[name="icone"]');

    const identificadorError = document.querySelector('.error-ident')
    const valorError = document.querySelector('.error-valor')
    const dataError = document.querySelector('.error-vencimento')
    const categoriaError = document.querySelector('.error-categoria')
    const iconeError = document.querySelector('.error-icone')
    let error;

    if(identificadorInput.value.length < 1 || identificadorInput.value.length > 40){
      identificadorError.innerHTML = 'O identificador precisa ter entre 1 e 40 caracteres!';
      error = true
    }else{
      identificadorError.innerHTML = '';
    }
    
    identificadorInput.value.replace(',', '.');

    if(valorInput.value.length < 1 || valorInput.value.length > 40){
      valorError.innerHTML = 'Digite valores válidos!';
      error = true
    }else{
      valorError.innerHTML = '';
    }

    if(!dataInput.value){
      dataError.innerHTML = 'Marque alguma data!';
      error = true
    }else{
      dataError.innerHTML = '';
    }
    console.log(iconeInput, iconeInput.value)

    let checkedInput;
    for (const input of iconeInput) {
      if(input.checked) {
        checkedInput = true;
        break;
      }
    }

    if(!checkedInput){
      iconeError.innerHTML = 'Marque algum ícone!';
      error = true
    }else{
      iconeError.innerHTML = '';
    }

    


    if(!error) el.submit()
  }
}