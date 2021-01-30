const Receita = require('../models/receitasModel');

exports.index = (req, res) => {
  res.render('receitas');
}

exports.send = async(req, res, next) => {
  try {
    const receita = new Receita(req.body);
    await receita.register();

    if(receita.errors.length>0) {
      req.flash('errors', receita.errors)
      req.session.save(function () {
        return res.redirect('/receita/index');
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