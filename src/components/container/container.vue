<template>
  <div :class="blockClasses"><slot></slot></div>
</template>

<script>
const containerBlockClass = 'h-container';

export default {
  name: 'Container',
  computed: {
    blockClasses() {
      return [containerBlockClass];
    },
  },
};
</script>

<style scoped>
</style>
