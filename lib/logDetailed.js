var moment = require('moment');
var chalk = require('chalk');
var now = moment();

function mapResult (obj, cb) {
  var result = {};

  Object.keys(obj).forEach(function (key, i, keys) {
    result[key] = cb(key, i, keys);
  });

  return result;
}

function logDetailed (result) {
  result = mapResult(result, function (key) {
    return moment(result[key], 'HH:mm');
  });

  var almost = result.finish.diff(now, 'minutes') <= 30;
  var goodToGo = now.isAfter(result.minimum);
  var onLimit = now.isAfter(result.finish) && now.isBefore(result.limit);

  result = mapResult(result, function (key) {
    return result[key].format('HH:mm');
  });

  console.log('Start    ', result.start);
  console.log('Remaining', almost ? chalk.blue(result.remaining) : result.remaining);
  console.log('Minimum  ', goodToGo ? chalk.green(result.minimum) : result.minimum);
  console.log('Finish   ', onLimit ? chalk.red(result.finish) : result.finish);

  if (result.limit) {
    console.log('Limit    ', onLimit ? chalk.yellow(result.limit) : result.limit);
  }
}

module.exports = logDetailed;
