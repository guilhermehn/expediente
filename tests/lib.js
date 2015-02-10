var expect = require('expect.js');
var lib = require('../lib');
var moment = require('moment');

describe('#lib', function () {
  describe('#isValidHour()', function () {
    it('should return true if the string is a valid HH:mm hour', function () {
      expect(lib.isValidHour('11:12')).ok();
      expect(lib.isValidHour('1:12')).ok();
      expect(lib.isValidHour('11:1')).not.ok();
      expect(lib.isValidHour('1:1')).not.ok();
    });

    it('should return false if string is invalid', function () {
      var invalidValues = ['25:00', '-1:00', '100', '0', undefined, null, false, true, 1, 12, 60];

      invalidValues.forEach(function (value) {
        expect(lib.isValidHour(value)).not.ok();
      });
    });
  });

  describe('#format()', function () {
    it('should run the moment#format() method with the `HH:mm` patern', function () {
      expect(lib.format(moment())).match(/^\d{2}:\d{2}$/);
    });
  });

  describe('#loadConfig()', function () {
    it('should load a config json file', function () {
      expect(lib.loadConfig(__dirname + '/json/testConfig.json')).a(Object);
    });

    it('should return null when the file does not exists', function () {
      expect(lib.loadConfig(__dirname + '/json/fakeConfig.json')).be(null);
    });

    it('should return null when the file is a invalid json', function () {
      expect(lib.loadConfig(__dirname + '/json/invalidConfig.json')).be(null);
    });
  });

  describe('#isValidOptions()', function () {
    it('should return false if the `start` or `hours` property doesn`t exists', function () {
      expect(lib.isValidOptions({ start: '9:00' })).not.ok();
      expect(lib.isValidOptions({ hours: '9:00' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00' })).ok();
    });

    it('should return false if the `start` property is invalid', function () {
      expect(lib.isValidOptions({ start: '9h00', hours: '9:00' })).not.ok();
      expect(lib.isValidOptions({ start: '9h', hours: '9:00' })).not.ok();
      expect(lib.isValidOptions({ start: '9', hours: '9:00' })).not.ok();
      expect(lib.isValidOptions({ start: 9, hours: '9:00' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00' })).ok();
    });

    it('should return false if the `hours` property is invalid', function () {
      expect(lib.isValidOptions({ start: '9:00', hours: '99:00' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9h00' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9h' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: 9 })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00' })).ok();
    });

    it('should return false if the `tolerance` property exists and it`s invalid', function () {
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00', tolerance: '28:00' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00', tolerance: '28h00' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00', tolerance: '8h00' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00', tolerance: '15m' })).not.ok();
      expect(lib.isValidOptions({ start: '9:00', hours: '9:00', tolerance: '00:15' })).ok();
    });
  });
});
