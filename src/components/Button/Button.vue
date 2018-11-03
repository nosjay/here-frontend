<template>
  <button :class="blockClasses" :disabled="disabled" @click="clickHandler">
    <Loading v-if="loading"></Loading>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
import { has } from '../../utils/assist';

const buttonBlockClass = 'h-button';

export default {
  name: 'Button',
  props: {
    type: {
      validator(value) {
        return has(value, ['default', 'primary', 'dashed', 'text', 'success', 'warning', 'danger']);
      },
      default: 'default',
    },
    size: {
      validator(value) {
        return has(value, ['small', 'default', 'large']);
      },
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    blockClasses() {
      return [
        buttonBlockClass,
        `${buttonBlockClass}--${this.type}`,
        {
          [`${buttonBlockClass}--${this.size}`]: this.size !== 'default',
        },
      ];
    },
  },
  methods: {
    clickHandler(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/button';
</style>
