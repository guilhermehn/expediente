function logDetailed (result) {
  console.log('Start    ', result.start);
  console.log('Finish   ', result.finish);
  console.log('MInimum  ', result.minimum);

  if (result.limit) {
    console.log('Limit    ', result.limit);
  }

  console.log('Remaining', result.remaining);
}

module.exports = logDetailed;
