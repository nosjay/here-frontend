import Vue from 'vue';
import Message from './Message.vue';


/**
 * @param properties
 * @return {*}
 */
Message.newInstance = (properties) => {
  const props = properties || {};

  // create new Message from 'Message.vue'
  const instance = new Vue({
    render(h) {
      return h(Message, {
        props,
      });
    },
  });

  // vue instance itself
  const self = instance.$mount();
  // append `LoadingBar` DOMNode to body
  document.body.appendChild(self.$el);
  // pure `LoadingBar` instance
  const message = instance.$children[0];

  return {
    /**
     * @param {object} noticeProps
     */
    notice(noticeProps) {
      message.addNotice(noticeProps);
    },
    /**
     * @param {string} noticeName
     */
    close(noticeName) {
      message.closeNotice(noticeName);
    },
    /**
     * @param {string} element
     */
    destroy(element) {
      message.destroyAllNotice();
      setTimeout(() => {
        document.body.removeChild(document.getElementsByClassName(element)[0]);
      }, 500);
    },
  };
};


export default Message;
