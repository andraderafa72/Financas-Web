const url = 'https://financas-web-app.herokuapp.com/api/overview/chart';

// URL PARA FETCH EM DESENVOLVIMENTO LOCALHOST
// const devUrl = 'http://localhost:5500/api/overview/chart';

// BUSCANDO COMPONENTES NA DOM
const h1Receitas = document.querySelector('.valor-receitas-mensais')
const h1Despesas = document.querySelector('.valor-despesas-mensais')
const h1MeuDinheiro = document.querySelector('.valor-meu-dinheiro')
const h1Balanco = document.querySelector('.valor-balanco-mensal')

// CONEXÃO COM DADOS BRUTOS DOS ULTIMOS 12 MESES
fetch(url)
.then( function(response) {
  return response.json()
})
.then(function(data){ // TRATAMENTO DOS DADOS PARA INSERÇÃO NOS COMPONENTES DA DOM
  let totalReceitas = 0;
  let totalDespesas = 0;
  
  for(let dado of data.dados){
    totalReceitas += dado.valores.receita
    totalDespesas += dado.valores.despesa
  }

  // DINEHIRO EM CAIXA
  let dinheiroEmCaixa = (totalReceitas - totalDespesas).toFixed(2);
  dinheiroEmCaixa = dinheiroEmCaixa.replace(',', '.')
  
  if(dinheiroEmCaixa > 0){
    h1MeuDinheiro.classList.add('green')
    h1MeuDinheiro.innerHTML = `+R$ ${dinheiroEmCaixa.replace('.', ',')}`;
  }else{
    dinheiroEmCaixa *= -1;
    h1MeuDinheiro.classList.add('red');
    h1MeuDinheiro.innerHTML = `-R$ ${dinheiroEmCaixa.replace('.', ',')}`;
  }
  //

  // MEDIAS DE RECEITAS E DESPESAS DE TODAS AS TRANSAÇÕES (PADRÃO AO INICIAR A PAGINA TRANSAÇÕES)
  let dadosAExportar =  mediasTotais(data.transacoes);
  h1Receitas.innerHTML = `+R$ ${dadosAExportar.mediaReceitas.replace('.', ',')}`;
  h1Despesas.innerHTML = `-R$ ${dadosAExportar.mediaDespesas.replace('.', ',')}`;
  
  // BALANÇO DE TODAS AS TRANSAÇÕES
  let balanco = (dadosAExportar.mediaReceitas - dadosAExportar.mediaDespesas).toFixed(2);
  
  // TRATAMENTO DE FRONT-END
  if(balanco > 0){
    h1Balanco.classList.add('green')
    h1Balanco.innerText = `+R$ ${balanco.replace('.', ',')}`
  }else{
    balanco *= -1;
    h1Balanco.classList.add('red')
    h1Balanco.innerText = `-R$ ${balanco.replace('.', ',')}`
  }

  // EVENT LISTENER DO SELECT COM AS VARIAÇÕES DE MESES
  document.addEventListener('change', e => {
    const el = e.target;

    // CALCULO DAS MEDIAS POR PERIODO DE TEMPO
    if(el.value === 'todas') dadosAExportar = mediasTotais(data.transacoes);
    if(el.value === 'ultimo-mes') dadosAExportar = mediaDeValoresPorPeriodo(data.dados, 1, 10);
    if(el.value === 'ultimos-3-meses') dadosAExportar = mediaDeValoresPorPeriodo(data.dados, 3);
    if(el.value === 'ultimos-6-meses') dadosAExportar = mediaDeValoresPorPeriodo(data.dados, 6);
    if(el.value === 'ultimos-1-ano') dadosAExportar = mediaDeValoresPorPeriodo(data.dados, 12);
   
    // TRATAMENTO DE FRONT-END
    if(dadosAExportar.balanco > 0){
      h1Balanco.classList.add('green')
      h1Balanco.innerText = `+R$ ${dadosAExportar.balanco.replace('.', ',')}`
    }else{
      dadosAExportar.balanco = (dadosAExportar.balanco * -1).toFixed(2);
      h1Balanco.classList.add('red')
      h1Balanco.innerText = `-R$ ${dadosAExportar.balanco.replace('.', ',')}`
    }

    h1Receitas.innerHTML = `+R$ ${dadosAExportar.mediaReceitas.replace('.', ',')}`;
    h1Despesas.innerHTML = `-R$ ${dadosAExportar.mediaDespesas.replace('.', ',')}`;
  });

})
  .catch( function(error){
    console.log(error)
  })  

// CALCULAR A MEDIA DE RECEITAS E DESPESAS DE TODAS AS TRANSAÇÕES
function mediasTotais(transacoes){
  let despesa = 0;
  let receita = 0;

  let nReceita = 1;
  let nDespesa = 1;
  const now = new Date();
  const mes = now.getMonth();
  for(let transacao of transacoes){
    const dataTransacao = new Date(transacao.data)
    if(transacao.tipo === 'despesa') {
      despesa += transacao.valor;
      if(dataTransacao.getMonth() !== mes || dataTransacao.getUTCFullYear() !== now.getFullYear()){
        nReceita += 1;
      }
    }
    if(transacao.tipo === 'receita') {
      receita += transacao.valor;
      if(dataTransacao.getMonth() !== mes || dataTransacao.getUTCFullYear() !== now.getFullYear()){
        nDespesa += 1
      }
    }
  }5
  const mediaDespesas = (despesa / nDespesa).toFixed(2);
  const mediaReceitas = (receita / nReceita).toFixed(2);
  const balanco = (mediaReceitas - mediaDespesas).toFixed(2);
  return { mediaReceitas, mediaDespesas, balanco };
}
//

// CALCULAR A MEDIA DE RECEITAS E DESPESAS A PARTIR DO NUMERO DE MESES
function mediaDeValoresPorPeriodo(data, numeroDeMeses, index = 11){
  let somaReceitas = 0
  let somaDespesas = 0

  for (let i = 0; i < numeroDeMeses; i++) {
    somaReceitas += data[index].valores.receita;
    somaDespesas += data[index].valores.despesa;
    index -= 1;
  }

  const mediaReceitas = (somaReceitas / numeroDeMeses).toFixed(2);
  const mediaDespesas = (somaDespesas / numeroDeMeses).toFixed(2);
  const balanco = (mediaReceitas - mediaDespesas).toFixed(2);
  return { mediaReceitas, mediaDespesas, balanco }
}
//
