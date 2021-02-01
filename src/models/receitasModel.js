const mongoose = require('mongoose');

const ReceitaSchema = new mongoose.Schema({
  owner: { type: String, required: true},
  identificador: { type: String, required:true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true },
  categoria: { type: String, required: true },
  icone: { type: String, required: true },
  pago: { type: Boolean, required: false },
});

const ReceitaModel = mongoose.model('Receita', ReceitaSchema);

class Receita {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.despesa = null;
  }

  async register(){
    this.validate()

    if(this.errors.length > 0) return;
    this.despesa = await ReceitaModel.create(this.body)
  }

  async edit(id){
    if (typeof id !== 'string') return;

    this.validate();
    if(this.errors.length > 0 ) return;
    this.despesa = await ReceitaModel.findOneAndUpdate({ _id: id }, this.body, { new: true })
  }

  async buscarReceitas(id){
    const receita = await ReceitaModel.find({owner: id}).sort({data: -1})
    return receita
  }

  validate(){
    this.cleanUp();

    if(!this.isNumber(this.body.valor)) {
      this.errors.push('Digite um valor válido.')
      return;
    }
   }

  isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  cleanUp(){
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }

      this.body = {
        owner: this.body.owner,
        identificador: this.body.identificador,
        valor: this.body.valor,
        data: this.body.data,
        categoria: this.body.categoria,
        icone: this.body.icone,
        pago: this.body.pago,
      }
    }
  }
}

module.exports = Receita