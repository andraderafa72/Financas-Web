const Transacao = require('../models/transacaoModel');

exports.index = (req, res) => {
  res.render('despesas');
}

exports.indexRegister = (req, res) => {
  res.render('despesasForm');
}

exports.send = async(req, res) => {
  try {
    const despesa = new Transacao(req.body);
    await despesa.register();
    if(despesa.errors.length>0) {
      req.flash('errors', despesa.errors)
      req.session.save(function () {
        return res.redirect('/despesas/index');
      });
      return;
    }

    req.flash('success', 'Cadastrado com sucesso.');
    req.session.save(function () {
      return res.redirect('/')
    });
  } catch (error) {
    console.log(error)
    return res.render('404')
  }
}