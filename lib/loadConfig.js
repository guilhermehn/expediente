function loadConfig (file) {
  var config;

  try {
    config = require(file);
  }
  catch (e) {
    return null;
  }

  return config;
}

module.exports = loadConfig;
