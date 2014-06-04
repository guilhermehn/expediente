var expect = require('expect.js')
  , lib = require('../lib')
  , expediente = require('../')
  , simple
  , verbose
  , start = '10:09'
  , hours = '8:00'

beforeEach(function () {
  simple = expediente(start)
  verbose = expediente(start, true)
})

describe('lib', function () {
  describe('#expediente', function () {
    it('should calculate the expected exit time', function () {
      expect(simple).to.eql('19:57')
    })

    it('should return null if the start hour is invalid', function () {
      expect(expediente('25:09')).to.be(null)
    })

    describe('<hours>', function () {
      it('should accept a expedient time as second argument', function () {
        expect(expediente(start, hours)).to.eql('18:09')
      })

      it('should ignore invalid expedient time', function () {
        expect(expediente(start, '27:12')).to.eql('19:57')
        expect(expediente(start, '8:92')).to.eql('19:57')
      })
    })

    describe('<verbose>', function () {
      it('should return a detailed object', function () {
        expect(verbose).to.be.a('object')
      })

      it('it should return the start', function () {
        expect(verbose.start).to.eql(start)
      })

      it('it should return the exit hour', function () {
        expect(verbose.finish).to.eql('19:57')
      })

      it('should return the limit time', function () {
        expect(verbose.limit).to.eql('20:17')
      })

      it('should work with all the hours argument', function () {
        var hoursVerbose = {
            start: start
          , finish: '18:09'
          , limit: '18:29'
        }
        expect(expediente(start, hours, true)).to.eql(hoursVerbose)
      })
    })
  })
})