<template>
  <div :class="blockClasses">
    <div :class="`${blockClasses}__prepend`" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>

    <input
      :class="`${blockClasses}_inner`"
      v-bind="$attrs"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      ref="input"
      title=""
      @input="handleInput"
    >
  </div>
</template>

<script>
import { has } from '../../utils/assist';

const inputBlockClass = 'h-input';


export default {
  name: 'Input',
  props: {
    type: {
      validator(value) {
        return has(value, ['text', 'password', 'url', 'email', 'number']);
      },
      default: 'text',
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    form: {
      default: null,
    },
  },
  computed: {
    blockClasses() {
      return [inputBlockClass];
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style scoped>

</style>
