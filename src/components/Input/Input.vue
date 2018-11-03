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
      :disabled="inputDisabled"
      :autofocus="autofocus"
      :readonly="readonly"
      ref="input"
      title=""
      :placeholder="placeholder"
      @input="inputHandler"
      @blur="blurHandler"
      @change="changeHandler"
      @focus="focusHandler"
      @compositionstart="compositionHandler"
      @compositionupdate="compositionHandler"
      @compositionend="compositionHandler"
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
  inject: {
    form: {
      default: null,
    },
  },
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
    autofocus: {
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
  computed: {
    blockClasses() {
      return [inputBlockClass];
    },
    inputDisabled() {
      return this.disabled || (this.form || {}).disabled;
    },
  },
  data() {
    return {
      onComposition: false,
    };
  },
  methods: {
    inputHandler(event) {
      if (this.onComposition) {
        return;
      }
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
    focusHandler(event) {
      this.$emit('focus', event);
    },
    compositionHandler(event) {
      if (event.type === 'compositionend') {
        this.onComposition = false;
        this.inputHandler(event);
      } else {
        this.onComposition = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/input';
</style>
