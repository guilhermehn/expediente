/**
 * Return true if the string is a valid hour string HH:mm
 * @param  {String}  str The hour string
 * @return {Boolean}
 */
function isValidHour (str) {
  var time;

  // Return false if the string is falsy,
  // has less than 4 characters (H:mm),
  // more than 5 (HH:mm),
  // or is not in the format of HH:mm
  if (!str || str.length < 4 || str.length > 5 || !/^\d{1,2}:\d{2}$/.test(str)) {
    return false;
  }

  // Split the hour string into two parts
  // by the collon and parse it to integer
  time = str.split(':').map(function (n) {
    return n >>> 0;
  });

  // Return false if the hour part is greater than 24,
  // is less than 0, the minutes part is greater than 59
  // or is less than 0
  if (time[0] > 24 || time[0] < 0 || time[1] > 59 || time[1] < 0) {
    return false;
  }

  return true;
}

module.exports = isValidHour;
