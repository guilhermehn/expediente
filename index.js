var moment = require('moment');
var lib = require('./lib');
var defaultFormat = 'HH:mm';

/*
  options
    - start:     start time
    - hours:     expedint duration
    - tolerance: tolerance after work
    - simple:    simple output
*/

function expediente (options) {
  var now = moment();
  var minimum;

  if (!lib.isValidOptions(options)) {
    return null;
  }

  var start = moment(options.start, defaultFormat);
  var duration = moment(options.hours, defaultFormat);
  var finish = start.clone().add(duration);

  if (options.simple) {
    return lib.format(finish);
  }

  var result = {
    start: lib.format(start),
    finish: lib.format(finish)
  };

  if (options.tolerance) {
    var tolerance = moment(options.tolerance, defaultFormat);

    if (tolerance.minutes() > 0 || tolerance.hours() > 0) {
      minimum = finish.clone().subtract(tolerance);
      result.limit = lib.format(finish.clone().add(tolerance));
    }

    result.minimum = lib.format(minimum);
  }

  if (now.isBefore(finish)) {
    var getRemaining = now.diff.bind(minimum ? minimum : finish, now);

    var remaining = {
      hours: getRemaining('hours'),
      minutes: getRemaining('minutes') % 60
    };

    result.remaining = lib.format(moment([remaining.hours, remaining.minutes].join(':'), defaultFormat));
  }

  return result;
}

module.exports = expediente;
