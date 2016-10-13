/**
 * Load a json file and return
 * the parsed content as a object
 * @param  {String} file
 * @return {Object|Null}
 */
function loadConfig(file) {
  // Load the json file using `require`.
  // If the file is a invalid json
  // `null` will be returned
  try {
    return require(file)
  }
  catch (e) {
    return null
  }
}

module.exports = loadConfig
