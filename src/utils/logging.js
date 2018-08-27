/* eslint-disable no-console */
import { IS_PRODUCTION_ENV } from '../configs';


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

class LoggerDisabled {
  group() {
    return this;
  }

  end() {
    return this;
  }

  error() {
    return this;
  }

  warning() {
    return this;
  }

  info() {
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
    return IS_PRODUCTION_ENV ? new LoggerDisabled() : new Logger().group(name);
  },
};
