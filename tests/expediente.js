var expect = require('expect.js');
var moment = require('moment');
var expediente = require('../');
var defaults = require('../conf');
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

    it('should calculate early finish time if the early property is passed', function () {
      var result = expediente({
        start: '10:00',
        hours: '8:00',
        early: '1:00'
      });

      expect(result.finish).be('17:00');
    });
  });
});
