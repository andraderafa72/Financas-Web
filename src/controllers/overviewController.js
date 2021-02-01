const Receita = require('../models/receitasModel');
const Despesa = require('../models/despesaModel');

exports.index = async(req,res) => {
  if(!req.params.id) res.render('404')
  try {
    const receitas = await Receita.prototype.buscarReceitas();
    res.render('overview', { receitas })
  } catch (error) {
    console.log(error)
  }
  
}