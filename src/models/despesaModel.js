const mongoose = require('mongoose');

const DespesaSchema = new mongoose.Schema({
  owner: { type: String, required: true},
  identificador: { type: String, required:true },
  valor: { type: Number, required: true },
  vencimento: { type: Date, required: true },
  categoria: { type: String, required: true },
  icone: { type: String, required: true },
  pago: { type: Boolean, required: false },
});

const DespesaModel = mongoose.model('Despesa', DespesaSchema);

class Despesa {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.despesa = null;
  }

  async register(){
    this.validate()

    if(this.errors.length > 0) return;
    this.despesa = await DespesaModel.create(this.body)
  }

  async edit(id){
    if (typeof id !== 'string') return;

    this.validate();
    if(this.errors.length > 0 ) return;
    this.despesa = await DespesaModel.findOneAndUpdate({ _id: id }, this.body, { new: true })
  }

  async buscarReceitas(){
    const despesa = await DespesaModel.find().sort({data: -1})
    return despesa
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
        valor: this.body.valor.replace(',', '.'),
        vencimento: this.body.vencimento,
        categoria: this.body.categoria,
        icone: this.body.icone,
        pago: this.body.pago,
      }
    }
  }
}

module.exports = Despesa