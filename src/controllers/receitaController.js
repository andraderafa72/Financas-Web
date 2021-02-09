const Transacao = require('../models/transacaoModel');

exports.index = (req, res) => {
  res.render('receitas');
}
exports.indexRegister = (req, res) => {
  res.render('receitasForm');
}

exports.send = async(req, res, next) => {
  try {
    const receita = new Transacao(req.body);
    await receita.register();

    if(receita.errors.length>0) {
      req.flash('errors', receita.errors)
      req.session.save(function () {
        return res.redirect('/receitas/registrar/index');
      });
      return;
    }

    req.flash('success', 'Cadastrado com sucesso.');
    req.session.save(function () {
      return res.redirect(`/overview/index/${req.session.user._id}`)
    });
  } catch (error) {
    console.log(error)
    return res.render('404')
  }
}