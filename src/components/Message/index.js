import Message from './message';


let messageUniqueIndex = 0;
/**
 * @type {*|null|Message}
 */
let messageInstance = null;
/**
 * @type {{info: string, warning: string, error: string, success: string}}
 */
const typeIcons = {
  info: 'h-icon__info-circle',
  warning: 'h-icon__warning-circle',
  error: 'h-icon__error-circle',
  success: 'h-icon__success-circle',
};
/**
 * @type {{top: number, onClose: Function, duration: number}}
 */
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
    // create new Message instance
    messageInstance = Message.newInstance({
      top: `${defaults.top}px`,
    });
  }
  return messageInstance;
}

/**
 * @param {string} type
 * @param {string} content
 * @param {number} duration
 * @param {function} onClose
 */
function notice(type, content, duration = defaults.duration, onClose = defaults.onClose) {
  // eslint-disable-next-line no-plusplus
  const name = `h_message_${messageUniqueIndex++}`;
  const message = getMessageInstance();

  // create new Notice instance into Message container
  message.notice({
    name,
    duration,
    onClose,
    content: `
      <div class="h-message__text">
        <i class="h-message__marker h-icon ${typeIcons[type]} h-message__marker--${type}"></i>
         <span>${content}</span>
      </div>
    `,
  });

  // close handler
  return () => {
    message.close(name);
  };
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
    if (!options) {
      throw new Error('message content not found');
    } else if (typeof options === 'string') {
      collection = {
        content: options,
      };
    }
    return notice(type, collection.content, collection.duration, collection.onClose);
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
  /**
   * destroy all messages
   */
  destroy() {
    if (messageInstance !== null) {
      const instance = getMessageInstance();
      messageInstance = null;
      instance.destroy('h-message');
    }
  },
};
