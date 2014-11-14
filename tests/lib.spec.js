var expect = require('expect.js');
var expediente = require('../');
var lib = require('../lib');
var start = '10:00';
var defaults = require('../conf');

var testHours = '8:00';

var simple = expediente({
  start: start,
  hours: defaults.hours
});

var verbose = expediente({
  start: start,
  hours: defaults.hours,
  detailed: true
});

describe('#expediente', function () {
  it('should calculate the expected exit time', function () {
    expect(simple).to.eql('19:48');
  });

  it('should return null if the start hour is invalid', function () {
    expect(expediente('25:09')).to.be(null);
  });

  describe('<hours>', function () {
    it('should accept a expedient time as second argument', function () {
      var options = {
        start: start,
        hours: testHours
      };

      expect(expediente(options)).to.eql('18:00');
    });

    it('should return null if the expedient duration is invalid', function () {
      var options = {
        start: start,
        hours: '27:12'
      };

      expect(expediente(options)).to.eql(null);
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
      var expected = {
        start: '10:00',
        finish: '18:00'
      };

      var options = {
        start: start,
        hours: testHours,
        detailed: true
      };

      var result = expediente(options);

      expect(result.start).to.eql(expected.start);
      expect(result.finish).to.eql(expected.finish);
      expect(result.minimum).to.eql(expected.minimum);
    });
  });
});

describe('#lib', function () {
  describe('#isValidHour()', function () {
    it('should return true if the string is a valid HH:mm hour', function () {
      expect(lib.isValidHour('11:12')).to.be.ok();
      expect(lib.isValidHour('1:12')).to.be.ok();
    });

    it('should return false if string is invalid', function () {
      var invalidValues = ['25:00', '-1:00', '100', '0', undefined, null, false, true, 1, 12, 60];

      invalidValues.forEach(function (value) {
        expect(lib.isValidHour(value)).to.not.be.ok();
      });
    });
  });
});
