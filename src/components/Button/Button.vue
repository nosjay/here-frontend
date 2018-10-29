<template>
  <button :class="blockClasses" :disabled="disabled">
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
const buttonBlockClass = 'h-button';

export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    blockClasses() {
      return [buttonBlockClass];
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/button';
</style>
