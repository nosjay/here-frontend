<template>
  <section :class="blockClasses">
    <slot></slot>
  </section>
</template>

<script>
const contentBlockClass = 'h-content';

export default {
  name: 'Content',
  computed: {
    blockClasses() {
      return [contentBlockClass];
    },
  },
};
</script>

<style lang="scss">
@import "../../../styles/layout/content";
</style>
