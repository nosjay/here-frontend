<template>
  <footer :class="blockClasses"><slot></slot></footer>
</template>

<script>
const footerBlockClass = 'h-layout__footer';

export default {
  name: 'Footer',
  props: {
    center: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    blockClasses() {
      return [
        footerBlockClass,
        {
          [`${footerBlockClass}--center`]: this.center,
        },
      ];
    },
  },
};
</script>
