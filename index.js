/*eslint no-console: "error"*/

var moment = require('moment');
var lib = require('./lib');
var defaultFormat = 'HH:mm';

/**
 * Calculate the expedient time
 * @param  {object} options
 * @return {object}
 */
function expediente(options) {
  var now;
  var minimum;

  // Return null if the options object is invalid
  if (!lib.isValidOptions(options)) {
    return null;
  }

  // Start time moment object
  var start = moment(options.start, defaultFormat);

  // Duration time moment object
  var duration = moment(options.hours, defaultFormat);

  // If the early property is received
  // subtract it from the duration time
  if (options.early) {
    duration = duration.subtract(moment(options.early, 'HH:mm'));
  }

  // Finish time moment object
  var finish = start.clone().add(duration);

  // If the output mode is set to `finish`
  // there's no need to continue, just
  // return the finish time string
  if (options.finish || options.simple) {
    if (options.simple) {
      /* eslint-disable no-console */
      console.log('Deprecation warning: the `--simple` flag will be removed from the next versions');
      console.log('                     Use the `--finish` flag instead');
      /* eslint-enable no-console */
    }

    return lib.format(finish);
  }

  // The verbose output object starts
  // with the start and finish time
  var result = {
    start: lib.format(start),
    finish: lib.format(finish)
  };

  // If the tolerance options is received
  // do the tolerance calculation
  if (options.tolerance) {
    // Tolerance time moment object
    var tolerance = moment(options.tolerance, defaultFormat);

    // If the tolerance is greater than 0 minutes or 0 hours
    // calculate the minimum time and add the limit time
    // to the result object
    if (tolerance.minutes() > 0 || tolerance.hours() > 0) {
      minimum = finish.clone().subtract(tolerance);

      // If the output mode is set to `minimum`
      // there's no need to continue, just
      // return the minimum time string
      if (options.minimum) {
        return lib.format(minimum);
      }

      result.limit = lib.format(finish.clone().add(tolerance));
    }

    // Add the minimum property to the result object
    result.minimum = lib.format(minimum);
  }

  // Get the actual time
  now = moment().set({ seconds: 0, milliseconds: 0 });

  // If now is before the finish time
  if (now.isBefore(finish)) {
    // If there's a minimum time, use it to curry the
    // remaining time calculator, otherwise use the finish time
    var getRemaining = now.diff.bind(minimum ? minimum : finish, now);

    // The remaining time to be added to the result
    // with the hours and minutes remaining to the
    // minium or finish time
    var remaining = {
      hours: getRemaining('hours'),
      minutes: getRemaining('minutes') % 60
    };

    // Add the remaining time object the actual result
    result.remaining = lib.format(moment([remaining.hours, remaining.minutes].join(':'), defaultFormat));
  }

  return result;
}

module.exports = expediente;
