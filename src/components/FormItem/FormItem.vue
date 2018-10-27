<template>
  <div :class="blockClasses">
    <label
      :class="`${formItemBlockClass}__label`" :style="labelStyles" :for="labelFor"
      v-if="labelShow"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <div :class="`${formItemBlockClass}__body`" :style="bodyStyles">
      <slot></slot>

      <transition name="fade">
        <div :class="`${formItemBlockClass}__body__message`" v-if="validateState === 'error'">
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Emitter from '../../utils/emitter';

const formItemBlockClass = 'h-form__item';


export default {
  name: 'FormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
    },
    labelFor: {
      type: String,
    },
    labelWidth: {
      type: String,
    },
    prop: {
      type: String,
    },
    required: {
      type: Boolean,
    },
  },
  computed: {
    blockClasses() {
      return [
        formItemBlockClass,
        {
          [`${formItemBlockClass}--required`]: this.required || this.isRequired,
        },
      ];
    },
    labelStyles() {
      return {
        width: this.labelWidth || this.form.labelWidth,
      };
    },
    bodyStyles() {
      return {
        marginLeft: this.labelWidth || this.form.labelWidth,
      };
    },
    labelShow() {
      return !!(this.label || this.$slots.label);
    },
    fieldValue: {
      cache: false,
      get() {
        if (this.form.model && this.prop) {
          if (this.form.model[this.prop]) {
            return this.form.model[this.prop];
          }
        }
        return null;
      },
    },
  },
  data() {
    return {
      formItemBlockClass,
      isRequired: false,
      validateState: '',
      validateMessage: '',
      validator: {},
    };
  },
  methods: {
    reset() {
      this.validateState = '';
      this.validateMessage = '';
    },
    validate(trigger, callback) {
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('Form', 'add-form-item', [this]);

      Object.defineProperty(this, 'initialValue', {
        value: this.fieldValue,
      });
    }
  },
  beforeDestroy() {
    this.dispatch('Form', 'remove-form-item', [this]);
  },
};
</script>
