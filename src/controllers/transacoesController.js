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
    return res.redirect(`/transacoes/index/${req.session.user._id}`)
  } catch (error) {
    console.log(error)
  }
}

exports.editIndex = async(req, res) => {
  if (!req.params.id) return res.render('404');

  const transacao = await Transacao.prototype.buscarPorId(req.params.id);
  console.log(transacao)
  if (!transacao) return res.render('404');
  res.render('editForm', { transacao })
}

exports.edit = async(req,res) => {
  if (!req.params.id) return res.render('404');

  try {
    const transacao = new Transacao(req.body);
    await transacao.edit(req.params.id);

    if (transacao.errors.length > 0) {
      req.flash('errors', transacao.errors);
      req.session.save(() => { res.redirect(`/overview/index/${req.session.user._id}`) });
      console.log(transacao.body)

      return;
    }

    req.flash('success', 'Transação editada com sucesso!');
    req.session.save(() => res.redirect(`/transacoes/index/${req.session.user._id}`));
    return;
  } catch (error) {
    console.log(error);
    res.render('404')
  }
}