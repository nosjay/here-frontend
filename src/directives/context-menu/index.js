// context-menu directive
export default {
  bind(el, binding) {
    // check selection state
    if (binding.modifiers.disabled) {
      el.oncontextmenu = () => false;
    }
  },
};
