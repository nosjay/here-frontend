/* eslint-disable no-console */


// @TODO color support
class Logger {
  group(name) {
    console.group(name);
    return this;
  }

  end() {
    console.groupEnd();
    return this;
  }

  error(message) {
    console.error(message);
    return this;
  }

  warning(message) {
    console.warn(message);
    return this;
  }

  info(message) {
    console.info(message);
    return this;
  }
}

let loggerInstance = null;

function getLoggerInstance() {
  if (loggerInstance === null) {
    loggerInstance = new Logger();
  }
}

export default {
  error(message) {
    getLoggerInstance().error(message);
  },
  warning(message) {
    getLoggerInstance().warning(message);
  },
  info(message) {
    getLoggerInstance().info(message);
  },
  group(name) {
    return new Logger().group(name);
  },
};
