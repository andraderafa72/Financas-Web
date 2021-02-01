const mongoose = require('mongoose');

const TransacaoSchema = new mongoose.Schema({
  owner: { type: String, required: true},
  identificador: { type: String, required:true },
  valor: { type: Number, required: true },
  data: { type: Date, required: true },
  categoria: { type: String, required: true },
  icone: { type: String, required: true },
  tipo: { type: String, required: true },
  pago: { type: Boolean, required: false },
});

const TransacaoModel = mongoose.model('Transacao', TransacaoSchema);

class Transacao {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.transacao = null;
  }

  async register(){
    this.validate()

    if(this.errors.length > 0) return;
    this.transacao = await TransacaoModel.create(this.body)
  }

  async edit(id){
    if (typeof id !== 'string') return;

    this.validate();
    if(this.errors.length > 0 ) return;
    this.transacao = await TransacaoModel.findOneAndUpdate({ _id: id }, this.body, { new: true })
  }

  async buscarTransacaos(){
    const Transacao = await TransacaoModel.find().sort({data: -1})
    return Transacao
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

module.exports = Transacao