var moment = require('moment')
  , format = require('./format')
  , conf = require('../conf')
  , isBoolean = require('lodash.isboolean')

function expediente (start, hours, limit, verbose) {
  start = moment(start, 'HH:mm')

  if (isBoolean(hours)) {
    verbose = hours
    hours = conf.hours
  }
  else {
    hours = moment(hours, 'HH:mm')

    if (hours.isValid()) {
      hours = {
          hours: hours.hours()
        , minutes: hours.minutes()
      }
    }
    else {
      hours = conf.hours
    }
  }

  if (isBoolean(limit)) {
    verbose = limit
    limit = conf.limit
  }

  var finish
    , limit

  if (!start || !start.isValid()) {
    return null
  }

  finish = start.clone().add(hours)

  if (!verbose) {
    return format(finish)
  }

  limit = finish.clone().add('minutes', 20)

  return {
      start: format(start)
    , finish: format(finish)
    , limit: format(limit)
    , remaining: 
  }
}

module.exports = expediente