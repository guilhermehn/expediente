var moment = require('moment')
  , format = require('./format')
  , util = require('util')

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
    , h, m

  options.start = moment(options.start, 'HH:mm')

  if (!options.start || !options.start.isValid()) {
    return null
  }

  duration = moment.bind(moment, options.hours)

  if (typeof options.hours === 'string') {
    options.hours = options.hours.split(':').map(function (i) {
      return parseInt(i, 10)
    })
    if (options.hours[0] > 24 || options.hours[1] > 59) {
      return null
    }
    duration.bind(moment, 'HH:mm')
  }

  duration = duration()
  if (duration.isValid()) {
    duration = {
        hours: duration.hours()
      , minutes: duration.minutes()
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

  remainingFn = result.finish.diff.bind(result.finish, options.start)
  remaining = {
      hours: remainingFn('hours')
    , minutes: remainingFn('minutes') % 60
  }

  result.finish = format(result.finish)
  result.remaining = format(moment(remainingFn('hours') + ':' + remainingFn('minutes') % 60, 'HH:mm'))

  return result
}

module.exports = expediente