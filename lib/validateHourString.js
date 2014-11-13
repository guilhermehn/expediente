/**
 * validateHourString
 * Validates if the string is in the HH:mm format
 */

function validateHourString (s) {
  var n;

  if (!/^\d{1,2}:\d{1,2}$/.test(s)) {
    return false;
  }

  n = s.split(':').map(function (i) {
    return i >>> 0;
  });

  // validate hours
  if (n[0] > 24 || n[0] < 0 || n[1] > 59 || n[1] < 0) {
    return false;
  }

  return true;
}

module.exports = validateHourString;
