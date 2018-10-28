<template>
  <div :class="blockClasses">
    <div :class="`${blockClasses}__prepend`" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>

    <input
      :id="controlId"
      :class="`${blockClasses}__inner`"
      v-bind="$attrs"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      ref="input"
      title=""
      :placeholder="placeholder"
      @input="handleInput"
      @blur="blurHandler"
      @change="changeHandler"
    >
  </div>
</template>

<script>
import { has } from '../../utils/assist';
import Emitter from '../../utils/emitter';

const inputBlockClass = 'h-input';


export default {
  name: 'Input',
  mixins: [Emitter],
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
    controlId: {
      type: String,
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
    blurHandler(event) {
      this.$emit('blur', event);
      this.dispatch('FormItem', 'form-controller-blur', [event]);
    },
    changeHandler(event) {
      /**
       * this.$emit('change', event);
       * replace by watch
       */
      this.dispatch('FormItem', 'from-controller-change', [event]);
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/input';
</style>
