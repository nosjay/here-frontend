<template>
  <footer :class="blockClasses"><slot></slot></footer>
</template>

<script>
const footerBlockClass = 'h-layout__footer';

export default {
  name: 'Footer',
  computed: {
    blockClasses() {
      return [
        footerBlockClass,
      ];
    },
  },
};
</script>
