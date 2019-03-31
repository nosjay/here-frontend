// selection directive
export default {
  bind(el, binding) {
    // check selection state
    if (binding.modifiers.disabled) {
      el.onselectstart = (e) => {
        e.preventDefault();
        return false;
      };
      el.classList.add('h-attr__no-select');
    }

    // create style element
    const style = document.createElement('style');
    // add background and foreground primaryColor
    if (binding.value && binding.value.background) {
      style.innerHTML += `::selection { background: ${binding.value.background}; }`;
      style.innerHTML += `::-moz-selection { background: ${binding.value.background}; }`;
      style.innerHTML += `::webkit-selection { background: ${binding.value.background}; }`;
    }
    if (binding.value && binding.value.foreground) {
      style.innerHTML += `::selection { color: ${binding.value.foreground}; }`;
      style.innerHTML += `::-moz-selection { color: ${binding.value.foreground}; }`;
      style.innerHTML += `::webkit-selection { color: ${binding.value.foreground}; }`;
    }

    style.id = 'h-selection-style';
    document.head.appendChild(style);
    // el.oncontextmenu = () => false;
  },
  unbind() {
    const style = document.querySelector('#h-selection-style');
    if (style) {
      style.remove();
    }
  },
};
