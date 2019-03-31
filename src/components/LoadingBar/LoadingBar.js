import Vue from 'vue';
import LoadingBar from './LoadingBar.vue';


LoadingBar.newInstance = (properties) => {
  const props = properties || {};

  // create new LoadingBar from 'LoadingBar.vue'
  let instance = new Vue({
    data: props,
    render(h) {
      return h(LoadingBar, {
        props,
      });
    },
  });

  // vue instance itself
  const self = instance.$mount();
  // append `LoadingBar` DOMNode to body
  document.body.appendChild(self.$el);
  // pure `LoadingBar` instance
  const loadingBar = instance.$children[0];

  // return a closure with instance of `LoadingBar`
  return {
    // change `LoadingBar` data
    setData(options) {
      if ('percent' in options) {
        loadingBar.percent = options.percent;
      }
      if (options.status) {
        loadingBar.status = options.status;
      }
      if ('show' in options) {
        loadingBar.show = options.show;
      }
    },
    destroy() {
      // remove HTMLNode from body
      document.body.removeChild(document.getElementsByClassName('h-loading-bar')[0]);
      // destroy Vue instance
      instance = null;
    },
  };
};

export default LoadingBar;
