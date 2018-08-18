<template>
  <main :class="blockClasses"><slot></slot></main>
</template>

<script>
const mainBlockClass = 'h-layout__main';

export default {
  name: 'Main',
  computed: {
    blockClasses() {
      return [mainBlockClass];
    },
  },
};
</script>
