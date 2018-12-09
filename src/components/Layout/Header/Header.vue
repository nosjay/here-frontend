<template>
  <header :class="blockClasses" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
const headerBlockClass = 'h-layout__header';

export default {
  name: 'Header',
  props: {
    height: {
      type: String,
      default: '60px',
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    blockClasses() {
      return [
        headerBlockClass,
        {
          [`${headerBlockClass}--shadow`]: this.shadow,
          [`${headerBlockClass}--fixed`]: this.fixed,
        },
      ];
    },
  },
};
</script>
