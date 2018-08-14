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
      default: '64px',
    },
  },
  computed: {
    blockClasses() {
      return [headerBlockClass];
    },
  },
};
</script>

<style lang="scss">

</style>
