const Transacao = require('../models/transacaoModel');

exports.index = async(req,res) => {
  if(!req.params.id) res.render('404')
  try {
    const transacoes = await Transacao.prototype.buscarTransacoes(req.session.user._id);
    res.render('overview', { transacoes })
  } catch (error) {
    console.log(error)
  }
  
}