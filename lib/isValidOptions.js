var isValidHour = require('./isValidHour')

/**
 * Return true if the options object passes all validations
 * @param  {Object}  options [description]
 * @return {Boolean}         [description]
 */
function isValidOptions(options) {
  // Return false if the options object does not have
  // a `start` and a `hours` property
  if (!isValidHour(options.start) || !isValidHour(options.hours)) {
    return false
  }

  // Return false if the `tolerace` property exists and it's not a valid hour string
  if (typeof options.tolerance !== 'undefined' && !isValidHour(options.tolerance)) {
    return false
  }

  // Return false if the `early` property exists and it's not a valid hour string
  if (typeof options.early !== 'undefined' && !isValidHour(options.early)) {
    return false
  }

  return true
}

module.exports = isValidOptions
