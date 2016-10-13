const moment = require('moment')
const lib = require('./lib')
const DEFAULT_FORMAT = 'HH:mm'

/**
 * Calculate the expedient time
 * @param  {object} options
 * @return {object}
 */
function expediente (options) {
  // Return null if the options object is invalid
  if (!lib.isValidOptions(options)) {
    return null
  }

  // Start time moment object
  const start = moment(options.start, DEFAULT_FORMAT)

  // Duration time moment object
  let duration = moment(options.hours, DEFAULT_FORMAT)

  // If the early property is received
  // subtract it from the duration time
  if (options.early) {
    const earlyTime = moment(options.early, DEFAULT_FORMAT)
    duration = duration.subtract({
      minutes: earlyTime.minutes(),
      hours: earlyTime.hours()
    })
  }

  // Finish time moment object
  const finish = start.clone().add({
    hours: duration.hours(),
    minutes: duration.minutes()
  })

  // If the output mode is set to `finish`
  // there's no need to continue, just
  // return the finish time string
  if (options.finish || options.simple) {
    return lib.format(finish)
  }

  // The verbose output object starts
  // with the start and finish time
  const result = {
    start: lib.format(start),
    finish: lib.format(finish)
  }

  // If the tolerance options is received
  // do the tolerance calculation
  let minimum
  if (options.tolerance) {
    // Tolerance time moment object
    const tolerance = moment(options.tolerance, DEFAULT_FORMAT)
    const toleranceMinutes = tolerance.minutes()
    const toleranceHours = tolerance.hours()

    // If the tolerance is greater than 0 minutes or 0 hours
    // calculate the minimum time and add the limit time
    // to the result object
    if (toleranceMinutes > 0 || toleranceHours > 0) {
      minimum = finish.clone().subtract({
        hours: toleranceHours,
        minutes: toleranceMinutes
      })

      // If the output mode is set to `minimum`
      // there's no need to continue, just
      // return the minimum time string
      if (options.minimum) {
        return lib.format(minimum)
      }

      result.limit = lib.format(finish.clone().add({
        hours: toleranceHours,
        minutes: toleranceMinutes
      }))
    }

    // Add the minimum property to the result object
    result.minimum = lib.format(minimum)
  }

  // Get the actual time
  const now = moment().set({ seconds: 0, milliseconds: 0 })

  // If now is before the finish time
  if (now.isBefore(finish)) {
    // If there's a minimum time, use it to curry the
    // remaining time calculator, otherwise use the finish time
    const getRemaining = now.diff.bind(minimum ? minimum : finish, now)

    // The remaining time to be added to the result
    // with the hours and minutes remaining to the
    // minium or finish time
    const remaining = {
      hours: getRemaining('hours'),
      minutes: getRemaining('minutes') % 60
    }

    // Add the remaining time object the actual result
    result.remaining = lib.format(moment([remaining.hours, remaining.minutes].join(':'), DEFAULT_FORMAT))
  }

  return result
}

module.exports = expediente
