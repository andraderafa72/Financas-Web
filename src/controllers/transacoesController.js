const Transacao = require('../models/transacaoModel');

exports.index = async(req, res) => {
  try { 
    const transacoes = await Transacao.prototype.buscarTransacoes(req.session.user._id)
    const dadosPorMes = res.locals.dados
    // res.redirect(`/transacoes/index/${req.session.user._id}`)
    res.render('transacoes', { transacoes, dadosPorMes });
  } catch (error) {
    console.log(error)
    res.render('404')
  }
}

exports.delete = async(req, res, next) => {
  if (!req.params.id) return res.render('404');
  try {
    await Transacao.prototype.delete(req.params.id)
    req.flash('success', 'Transação removida!');
    res.redirect(`/transacoes/index/${req.session.user._id}`)
    next()
  } catch (error) {
    console.log(error)
  }
}
