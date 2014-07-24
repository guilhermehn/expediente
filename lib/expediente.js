var moment = require('moment')
  , format = require('./format')
  , validateHourString = require('./validateHourString')

/*
  options
    - start:     start time
    - hours:     expedint duration
    - tolerance: tolerance after work
    - detailed:  verbose output
*/

function expediente (options) {
  var duration
    , remainingFn
    , remaining
    , result

  // start to moment obj
  options.start = moment(options.start, 'HH:mm')

  // validates start time
  if (!options.start || !options.start.isValid()) {
    return null
  }

  // duration partial with hours argument
  duration = moment.bind(moment, options.hours)

  if (typeof options.hours === 'string') {
    // parse HH:mm string to int
    options.hours = options.hours.split(':').map(function (i) {
      return i >>> 0
    })

    // validate hours
    if (options.hours[0] > 24 || options.hours[1] > 59) {
      return null
    }

    duration.bind(moment, 'HH:mm')
  }

  duration = duration()

  if (duration.isValid()) {
    duration = {
        h: duration.hours()
      , m: duration.minutes()
    }
  }
  else {
    return null
  }

  result = {
      start: format(options.start)
    , finish: options.start.clone().add(duration)
  }

  if (!options.detailed) {
    return format(result.finish)
  }

  if (options.tolerance) {
    result.limit = format(result.finish.clone().add(options.tolerance))
  }

  remainingFn = result.finish.diff.bind(result.finish, moment())
  remaining = {
      hours: remainingFn('hours')
    , minutes: remainingFn('minutes') % 60
  }

  result.finish = format(result.finish)
  result.remaining = format(moment(remainingFn('hours') + ':' + remainingFn('minutes') % 60, 'HH:mm'))

  return result
}

module.exports = expediente
