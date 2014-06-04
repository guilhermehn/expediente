var moment = require('moment')
  , format = require('./format')
  , conf = require('../conf')

function expediente (entrada, duracao, limite, verbose) {
  entrada = moment(entrada, 'HH:mm')

  if (typeof duracao === 'boolean') {
    verbose = duracao
    duracao = conf.duracao
  }
  else {
    duracao = moment(duracao, 'HH:mm')

    if (duracao.isValid()) {
      duracao = {
          hours: duracao.hours()
        , minutes: duracao.minutes()
      }
    }
    else {
      duracao = conf.duracao
    }
  }

  if (typeof limite === 'boolean') {
    verbose = limite
    limite = conf.limite
  }

  var saida
    , limite

  if (!entrada || !entrada.isValid()) {
    return null
  }

  saida = entrada.clone().add(duracao)

  if (!verbose) {
    return format(saida)
  }

  limite = saida.clone().add('minutes', 20)

  return {
      entrada: format(entrada)
    , saida: format(saida)
    , limite: format(limite)
  }
}

module.exports = expediente