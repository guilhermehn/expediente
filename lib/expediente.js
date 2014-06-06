var moment = require('moment')
  , format = require('./format')
  , util = require('util')

/*
  options
    - start:    start time
    - hours:    expedint duration
    - detailed: verbose output
*/

function expediente (options) {
  options.start = moment(options.start, 'HH:mm')

  if (!options.start || !options.start.isValid()) {
    return null
  }

  options.hours = moment(options.hours)

  if (options.hours.isValid()) {
    options.hours = {
        hours: options.hours.hours()
      , minutes: options.hours.minutes()
    }
  }

  var finish
    , limit
    , remainingFn
    , remaining

  finish = options.start.clone().add(options.hours)

  if (!options.detailed) {
    return format(finish)
  }

  limit = finish.clone().add(options.tolerance)

  remainingFn = finish.diff.bind(finish, options.start)
  remaining = {
      hours: remainingFn('hours')
    , minutes: remainingFn('minutes') % 60
  }

  return {
      start: format(options.start)
    , finish: format(finish)
    , limit: format(limit)
    , remaining: format(moment(remaining))
  }
}

module.exports = expediente