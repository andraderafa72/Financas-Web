const Receita = require('../models/receitasModel');
const Despesa = require('../models/despesaModel');

exports.index = async(req,res) => {
  try {
    const receitas = await Receita.prototype.buscarReceitas();
  res.render('overview', { receitas })
  } catch (error) {
    console.log(error)
  }
  
}