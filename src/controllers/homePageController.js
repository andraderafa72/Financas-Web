// RENDERIZA A PAGINA INICIAL
exports.homePageController = (req, res, next) => {
  res.render('index');
  return;
}

// RECEBE O POST DA PAGINA
exports.homePagePost = (req, res) => {
  res.send(req.body)
  return;
}