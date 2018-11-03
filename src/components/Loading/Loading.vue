<template>
  <div :class="blockClasses" :style="blockStyles"></div>
</template>

<script>
const loadingBlockClass = 'h-loading';

export default {
  name: 'Loading',
  props: {
    size: {
      type: String,
    },
  },
  computed: {
    blockClasses() {
      return [loadingBlockClass];
    },
    blockStyles() {
      const style = {};

      if (this.size) {
        style.width = this.size;
        style.height = this.size;
      }

      return style;
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/loading';
</style>
