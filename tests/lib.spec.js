var expect = require('expect.js');
var expediente = require('../');
var lib = require('../lib');
var defaults = require('../conf');
var moment = require('moment');
var start = '10:00';

var testHours = '8:00';

var simple = expediente({
  start: start,
  hours: defaults.hours,
  simple: true
});

var verbose = expediente({
  start: start,
  hours: defaults.hours,
  detailed: true
});

describe('#expediente', function () {
  it('should calculate the expected exit time', function () {
    expect(simple).eql('19:48');
  });

  it('should return null if the start hour is invalid', function () {
    expect(expediente('25:09')).be(null);
  });

  describe('<hours>', function () {
    it('should accept a expedient time as second argument', function () {
      var options = {
        start: start,
        hours: testHours,
        simple: true
      };

      expect(expediente(options)).eql('18:00');
    });

    it('should return null if the expedient duration is invalid', function () {
      var options = {
        start: start,
        hours: '27:12'
      };

      expect(expediente(options)).eql(null);
    });
  });

  describe('<verbose>', function () {
    it('should return a detailed object', function () {
      expect(verbose).be.a('object');
    });

    it('should return the start', function () {
      expect(verbose.start).eql(start);
    });

    it('should return the exit hour', function () {
      expect(verbose.finish).eql('19:48');
    });

    it('should work with all the hours argument', function () {
      var expected = {
        start: '10:00',
        finish: '18:00'
      };

      var options = {
        start: start,
        hours: testHours
      };

      var result = expediente(options);

      expect(result.start).eql(expected.start);
      expect(result.finish).eql(expected.finish);
      expect(result.minimum).eql(expected.minimum);
    });

    it('should have a `remaining` time when it`s is before the finish time', function () {
      var result = expediente({
        start: start,
        hours: testHours
      });

      var now = moment();
      var finish = moment(result.finish, 'HH:mm');

      if (finish.isAfter(now)) {
        var remaining = moment(result.remaining, 'HH:mm');
        var expected = moment(finish.diff(now, 'hours') + ':' + finish.diff(now, 'minutes') % 60, 'HH:mm');

        expect(remaining.format('HH:mm')).eql(expected.format('HH:mm'));
      }
    });
  });
});

describe('#lib', function () {
  describe('#isValidHour()', function () {
    it('should return true if the string is a valid HH:mm hour', function () {
      expect(lib.isValidHour('11:12')).be.ok();
      expect(lib.isValidHour('1:12')).be.ok();
    });

    it('should return false if string is invalid', function () {
      var invalidValues = ['25:00', '-1:00', '100', '0', undefined, null, false, true, 1, 12, 60];

      invalidValues.forEach(function (value) {
        expect(lib.isValidHour(value)).not.be.ok();
      });
    });
  });

  describe('#format()', function () {
    it('should run the moment#format() method with the `HH:mm` patern', function () {
      expect(lib.format(moment())).match(/^\d{2}:\d{2}$/);
    });
  });
});
