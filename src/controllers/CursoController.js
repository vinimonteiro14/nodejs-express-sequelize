const {Op} = require('sequelize');
const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller{
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    //se existirem os parametros, criar uma propriedade {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    //se existir data inicial, adiciona uma propriedade (gte) maior que ou igual com o valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    //se existir data final, adiciona uma propriedade (lte) menor que ou igual com o valor
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (erro) {
      return res.status(500).json({erro: erro.message});
    }
  }
}

module.exports = CursoController;