// EXECUTADOS AO INICIAR

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