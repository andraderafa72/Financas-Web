// EXECUTADOS AO INICIAR
exports.errorVariable = (req, res, next) =>{
  res.locals.erros = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  res.locals.paginaAtual = ''
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