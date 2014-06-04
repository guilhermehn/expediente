var expect = require('expect.js')
  , lib = require('../lib')
  , simple
  , verbose
  , entrada = '10:09'
  , duracao = '8:00'

beforeEach(function () {
  simple = lib.expediente(entrada)
  verbose = lib.expediente(entrada, true)
})

describe('lib', function () {
  describe('#expediente', function () {
    it('deve calcular o horário de saída a partir do horário de entrada inputado', function () {
      expect(simple).to.eql('19:57')
    })

    it('retornar nulo caso o horário de entrada seja inválido', function () {
      expect(lib.expediente('25:09')).to.be(null)
    })

    describe('<duracao>', function () {
      it('deve aceitar a duração da jornada de trabalho como parâmentro', function () {
        expect(lib.expediente(entrada, duracao)).to.eql('18:09')
      })

      it('deve ignorar tempo de jornada inválido', function () {
        expect(lib.expediente(entrada, '27:12')).to.eql('19:57')
        expect(lib.expediente(entrada, '8:92')).to.eql('19:57')
      })
    })

    describe('<verbose>', function () {
      it('o modo verbose deve retornar um objeto', function () {
        expect(verbose).to.be.a('object')
      })

      it('deve retornar a entrada', function () {
        expect(verbose.entrada).to.eql(entrada)
      })

      it('deve retornar a saida', function () {
        expect(verbose.saida).to.eql('19:57')
      })

      it('deve retornar o horário de tolerância', function () {
        expect(verbose.limite).to.eql('20:17')
      })

      it('deve funcionar junto com o parâmentro de duracao', function () {
        var duracaoVerbose = {
            entrada: entrada
          , saida: '18:09'
          , limite: '18:29'
        }
        expect(lib.expediente(entrada, duracao, true)).to.eql(duracaoVerbose)
      })
    })
  })
})