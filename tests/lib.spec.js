var expect = require('expect.js');
var moment = require('moment');
var expediente = require('../');
var lib = require('../lib');
var start = '10:00';
var defaults = require('../conf');
var hours = { hours: 8, minutes: 0 };
var simple = expediente({ start: start, hours: defaults.hours });
var verbose = expediente({ start: start, hours: defaults.hours, detailed: true });

describe('#expediente', function () {
  it('should calculate the expected exit time', function () {
    expect(simple).to.eql('19:48');
  });

  it('should return null if the start hour is invalid', function () {
    expect(expediente('25:09')).to.be(null);
  });

  describe('<hours>', function () {
    it('should accept a expedient time as second argument', function () {
      expect(expediente({ start: start, hours: hours })).to.eql('18:00');
    });

    it('should return null if the expedient duration is invalid', function () {
      expect(expediente({ start: start, hours: '27:12' })).to.eql(null);
    });
  });

  describe('<verbose>', function () {
    it('should return a detailed object', function () {
      expect(verbose).to.be.a('object');
    });

    it('it should return the start', function () {
      expect(verbose.start).to.eql(start);
    });

    it('it should return the exit hour', function () {
      expect(verbose.finish).to.eql('19:48');
    });

    it('should work with all the hours argument', function () {
      var hoursVerbose = {
        start: start,
        finish: '18:00',
        minimum: '17:45',
        remaining: moment('18:00', 'HH:mm').subtract(moment()).format('HH:mm')
      };
      expect(expediente({ start: start, hours: hours, detailed: true })).to.eql(hoursVerbose);
    });
  });
});

describe('#lib', function () {
  describe('#validateHourString()', function () {
    it('should validate HH:mm string', function () {
      expect(lib.validateHourString('11:12')).to.be.ok();
      expect(lib.validateHourString('1:12')).to.be.ok();
    });

    it('should return false if string is invalid', function () {
      var invalidValues = ['25:00', '-1:00', '100', '0', undefined, null, false, true, 1, 12, 60];

      invalidValues.forEach(function (value) {
        expect(lib.validateHourString(value)).to.not.be.ok();
      });
    });
  });
});
