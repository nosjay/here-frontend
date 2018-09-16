function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    if (child.$options.name === componentName) {
      child.$emit(eventName, ...params);
    } else {
      broadcast.apply(child, [componentName, eventName, params]);
    }
  });
}


export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;

      while (parent && (!parent.$options.name || parent.$options.name !== componentName)) {
        parent = parent.$parent;
      }

      if (parent) {
        parent.$emit(eventName, ...(params === undefined ? [] : params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, ...(params === undefined ? [] : params));
    },
  },
};
