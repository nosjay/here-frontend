import Message from './message';


let messageInstance = null;
const defaults = {
  top: 24,
  onClose: () => {},
  duration: 1.5,
};

/**
 * @return {Message}
 */
function getMessageInstance() {
  if (!messageInstance) {
    messageInstance = Message.newInstance({
      styles: {
        top: `${defaults.top}px`,
      },
    });
  }
  return messageInstance;
}

/**
 * @param {string} content
 * @param {number} duration
 * @param {function} onClose
 */
function notice(content, duration = defaults.duration, onClose = defaults.onClose) {
  const instance = getMessageInstance();
  instance.notice({
    duration,
    onClose,
    content: `<span>${content}</span>`,
  });

  return (() => () => {
    instance.close('');
  })();
}


export default {
  /**
   * @param {string|{content, duration, onClose}} options
   * @return {Function}
   */
  info(options) {
    return this.message('info', options);
  },
  /**
   * @param {string|{content, duration, onClose}} options
   * @return {Function}
   */
  warning(options) {
    return this.message('warning', options);
  },
  /**
   * @param {string|{content, duration, onClose}} options
   * @return {Function}
   */
  error(options) {
    return this.message('error', options);
  },
  /**
   * @param {string|{content, duration, onClose}} options
   * @return {Function}
   */
  success(options) {
    return this.message('success', options);
  },
  /**
   * @param {string} type
   * @param {string|{content, duration, onClose}} options
   * @return {Function}
   */
  message(type, options) {
    let collection = options;
    if (typeof options === 'string') {
      collection = {
        content: options,
      };
    }
    return notice(collection.content, collection.duration, collection.onClose);
  },
  /**
   * @param {{top, duration}} options
   */
  config(options) {
    if (options.top || options.top === 0) {
      defaults.top = options.top;
    }

    if (options.duration || options.duration === 0) {
      defaults.duration = options.duration;
    }
  },
  destroy() {
    const instance = getMessageInstance();
    messageInstance = null;
    instance.destroy('ivu-message');
  },
};
