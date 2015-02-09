/**
 * Load a json file and return
 * the parsed content as a object
 * @param  {String} file
 * @return {Object|Null}
 */
function loadConfig (file) {
  var config;

  // Load the json file using `require`.
  // If the file is a invalid json
  // `null` will be returned
  try {
    config = require(file);
  }
  catch (e) {
    return null;
  }

  return config;
}

module.exports = loadConfig;
