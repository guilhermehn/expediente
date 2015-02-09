var isValidHour = require('./isValidHour');

function isValidOptions (options) {
  if (!isValidHour(options.start) || !isValidHour(options.hours)) {
    return false;
  }

  if (typeof options.tolerance !== 'undefined' && !isValidHour(options.tolerance)) {
    return false;
  }

  if (typeof options.early !== 'undefined' && !isValidHour(options.early)) {
    return false;
  }

  return true;
}

module.exports = isValidOptions;
