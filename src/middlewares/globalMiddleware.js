const Transacao = require('../models/transacaoModel');

const now = new Date();
const thisMonth = now.getUTCMonth();
const meses = [
  {
    mes: qualMesAPartirDoAtual(thisMonth - 10),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 9),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 8),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 7),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 6),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 5),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 4),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 3),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 2),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth - 1),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth),
  },
  {
    mes: qualMesAPartirDoAtual(thisMonth + 1),
  },
];
const minDate = new Date(now - (1000 * 60 * 60 * 24 * 30 * 12));
const maxDate = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());

  
// EXECUTADOS AO INICIAR
exports.errorVariable = (req, res, next) =>{
  res.locals.erros = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  res.locals.meses = meses;
  res.locals.paginaAtual = '';
  res.locals.dados = [];
  res.locals.paginaAnterior = '';
  next();
}
// GERAR TOKEN AO CARREGAR
exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}

// TRATAR ERRO
exports.checkCSRFError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404');
  }
}

exports.loginRequired = (req, res, next) => {
  if(!req.session.user){
    req.flash('errors', 'Você precisa estar conectado para acessar.')
    req.session.save(() => res.redirect('/'))
    return
  }
  next();
}

exports.chartData = async(req, res, next) => {
  if(!req.session.user) return;
  try {
    const transacoes = await Transacao.prototype.buscarTransacoes(req.session.user._id);
    const valores = []

    for (const transacao of transacoes) {
      const data = new Date (transacao.data);
      valores.push({data, valor: transacao.valor, tipo: transacao.tipo})
    }

    const vetorDeDados = tratarDados(valores, minDate, maxDate)
    
    res.locals.dados.push(vetorDeDados);
    const json = {}
    json.dados = vetorDeDados;
    json.transacoes =transacoes;
    res.send(JSON.stringify(json));
  } catch (error) {
    console.log(error)
  }
}

exports.exportarDados = async(req, res, next) => {
  if(!req.session.user) return;
  try {
    const transacoes = await Transacao.prototype.buscarTransacoes(req.session.user._id);
    const valores = []

    for (const transacao of transacoes) {
      const data = new Date (transacao.data);
      valores.push({data, valor: transacao.valor, tipo: transacao.tipo})
    }

    const vetorDeDados = tratarDados(valores, minDate, maxDate)
    
    res.locals.dados = vetorDeDados;
    next()
  } catch (error) {
    console.log(error)
  }
}

function tratarDados(valores, minDate, maxDate){
  const chartMonths = [
    {
      mes: meses[0].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[1].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[2].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[3].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[4].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes: meses[5].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes: meses[6].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[7].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[8].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[9].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[10].mes,
      valores: {receita: 0, despesa: 0}
    },
    {
      mes:  meses[11].mes,
      valores: {receita: 0, despesa: 0}
    },
  ];

  for(let dado of valores){
    if(dado.data < minDate || dado.data > maxDate) continue;
    const data = new Date(dado.data);
    const mesDaTransacao = data.getMonth();

    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 10)){
      if(dado.tipo === 'despesa') {
        chartMonths[0].valores.despesa += dado.valor
      } else {
        chartMonths[0].valores.receita += dado.valor;
      }
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 9)){
      if(dado.tipo === 'despesa') {
        chartMonths[1].valores.despesa += dado.valor
      } else {
        chartMonths[1].valores.receita += dado.valor;
      }        
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 8)){
      if(dado.tipo === 'despesa') {
        chartMonths[2].valores.despesa += dado.valor
      } else {
        chartMonths[2].valores.receita += dado.valor;
      }        
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 7)){
      if(dado.tipo === 'despesa') {
        chartMonths[3].valores.despesa += dado.valor
      } else {
        chartMonths[3].valores.receita += dado.valor;
      }        
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 6)){
      if(dado.tipo === 'despesa') {
        chartMonths[4].valores.despesa += dado.valor
      } else {
        chartMonths[4].valores.receita += dado.valor;
      }        
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 5)){
      if(dado.tipo === 'despesa') {
        chartMonths[5].valores.despesa += dado.valor
      } else {
        chartMonths[5].valores.receita += dado.valor;
      }        
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 4)){
      if(dado.tipo === 'despesa') {
        chartMonths[6].valores.despesa += dado.valor
      } else {
        chartMonths[6].valores.receita += dado.valor;
      }        
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 3)){
      if(dado.tipo === 'despesa') {
        chartMonths[7].valores.despesa += dado.valor
      } else {
        chartMonths[7].valores.receita += dado.valor;
      }        
      continue;
    }
    if(qualMesAPartirDoAtual(mesDaTransacao) === qualMesAPartirDoAtual(thisMonth - 2)){
      if(dado.tipo === 'despesa') {
        chartMonths[8].valores.despesa += dado.valor
      } else {
        chartMonths[8].valores.receita += dado.valor;
      }        
      continue;
    }
    if(mesDaTransacao === thisMonth - 1){
      if(dado.tipo === 'despesa') {
        chartMonths[9].valores.despesa += dado.valor
      } else {
        chartMonths[9].valores.receita += dado.valor;
      }        
      continue;
    }
    if(mesDaTransacao === thisMonth){
      if(dado.tipo === 'despesa') {
        chartMonths[10].valores.despesa += dado.valor
      } else {
        chartMonths[10].valores.receita += dado.valor;
      }        
      continue;
    }
    if(mesDaTransacao === thisMonth + 1){
      if(dado.tipo === 'despesa') {
        chartMonths[11].valores.despesa += dado.valor
      } else {
        chartMonths[11].valores.receita += dado.valor;
      }        
      continue;
    }
  }

  return chartMonths;
}

function qualMesAPartirDoAtual(mes){
  switch(mes){
    case -10: 
      return 'Mar';
    case -9: 
      return 'Abr';
    case -8: 
      return 'Mai';
    case -7: 
      return 'Jun';
    case -6: 
      return 'Jul';
    case -5: 
      return 'Ago';
    case -4: 
      return 'Set';
    case -3: 
      return 'Out';
    case -2: 
      return 'Nov';
    case -1: 
      return 'Dez';
    case 0: 
      return 'Jan';
    case 1: 
      return 'Fev';
    case 2: 
      return 'Mar';
    case 3: 
      return 'Abr';
    case 4: 
      return 'Mai';
    case 5: 
      return 'Jun';
    case 6: 
      return 'Jul';
    case 7: 
      return 'Ago';
    case 8: 
      return 'Set';
    case 9: 
      return 'Out';
    case 10: 
      return 'Nov';
    case 11: 
      return 'Dez';
  }
}