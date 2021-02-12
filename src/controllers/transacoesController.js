const Transacao = require('../models/transacaoModel');

exports.index = async(req, res) => {
  try {
    const transacoes = await Transacao.prototype.buscarTransacoes(req.session.user._id)
    const dadosPorMes = res.locals.dados
    res.render('transacoes', { transacoes, dadosPorMes });
  } catch (error) {
    console.log(error)
    res.render('404')
  }
}

