const mongoose = require('mongoose');

const TransacaoSchema = new mongoose.Schema({
  owner: { type: String, required: true},
  identificador: { type: String, required:true },
  valor: { type: Number, required: true },
  data: { type: Date , required: true },
  categoria: { type: String, required: true },
  icone: { type: String, required: true },
  tipo: { type: String, required: true },
  pago: { type: Boolean, required: false },
});

const TransacaoModel = mongoose.model('Transações', TransacaoSchema);

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
    this.transacao = await TransacaoModel.findOneAndUpdate({ _id: id }, this.body)
  }

  async delete(id){
    if (typeof id !== 'string') return;
    this.transacao = await TransacaoModel.findOneAndDelete({ _id: id })
  }

  async buscarPorId(id){
    const transacao = await TransacaoModel.findOne({_id: id});
    return transacao;
  }

  async buscarTransacoes(id){
    const transacao = await TransacaoModel.find({owner: id}).sort({data: -1})
    return transacao;
  }
  
  validate(){
    this.cleanUp();

    if(!this.isNumber(this.body.valor) && this.body.valor < 0) {
      this.errors.push('Digite valores válidos.')
      return;
    }
    if(this.body.tipo === 'receita' && this.body.pago){
      this.errors.push('Não é possivel pagar uma receita a si mesmo.')
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
        tipo: this.body.tipo,
        pago: this.body.pago,
      }
    }
  }
}

module.exports = Transacao