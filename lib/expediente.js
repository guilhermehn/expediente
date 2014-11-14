var moment = require('moment');
var format = require('./format');
var isValidOptions = require('./isValidOptions');
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
  var limit;
  var minimum;

  if (!isValidOptions(options)) {
    return null;
  }

  var start = moment(options.start, defaultFormat);
  var duration = moment(options.hours, defaultFormat);
  var finish = start.clone().add(duration);

  if (options.simple) {
    return format(finish);
  }

  if (options.tolerance) {
    var tolerance = moment(options.tolerance, defaultFormat);

    if (tolerance.minutes() > 0 || tolerance.hours() > 0) {
      minimum = format(finish.clone().subtract(tolerance));
      limit = format(finish.clone().add(tolerance));
    }
  }

  var getRemaining = finish.diff.bind(finish, now);
  var remaining = {
    hours: getRemaining('hours'),
    minutes: getRemaining('minutes') % 60
  };

  if (now.isBefore(finish)) {
    remaining = format(moment([remaining.hours, remaining.minutes].join(':'), defaultFormat));
  }

  var result = {
    start: format(start),
    finish: format(finish),
    minimum: minimum,
    remaining: remaining,
    limit: limit
  };

  return result;
}

module.exports = expediente;
