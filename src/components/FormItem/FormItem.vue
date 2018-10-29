<template>
  <div :class="blockClasses">
    <label
      :class="`${classPrefix}__label`" :style="labelStyles" :for="labelFor"
      v-if="labelShow"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <div :class="`${classPrefix}__body`" :style="bodyStyles">
      <slot></slot>

      <transition name="fade">
        <div :class="`${classPrefix}__body__message`" v-if="validateState === 'error'">
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import Emitter from '../../utils/emitter';

const formItemBlockClass = 'h-form__item';


export default {
  name: 'FormItem',
  mixins: [Emitter],
  inject: {
    form: {
      default: null,
    },
  },
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
    rules: {
      type: Array,
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
          [`${formItemBlockClass}--error`]: this.validateState === 'error',
          [`${formItemBlockClass}--validating`]: this.validateState === 'validating',
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
    fieldRule() {
      const formRule = this.form.rules ? this.form.rules[this.prop] : [];
      return this.rules || formRule || [];
    },
  },
  data() {
    return {
      classPrefix: formItemBlockClass,
      isRequired: false,
      validateState: '',
      validateMessage: '',
      validator: {},
    };
  },
  methods: {
    applyRule() {
      if (this.fieldRule.length) {
        this.fieldRule.every((rule) => {
          if (rule.required) {
            this.isRequired = rule.required;
            return false;
          }
          return true;
        });

        this.$off('form-controller-blur', this.formBlurHandler);
        this.$off('form-controller-change', this.formChangeHandler);

        this.$on('form-controller-blur', this.formBlurHandler);
        this.$on('form-controller-change', this.formChangeHandler);
      }
    },
    reset() {
      this.validateState = '';
      this.validateMessage = '';
    },
    validate(trigger, callback = () => {}) {
      // eslint-disable-next-line arrow-body-style
      const rules = this.fieldRule.filter((rule) => {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });

      this.validateState = 'validating';
      const validator = new AsyncValidator({ [this.prop]: rules });
      validator.validate({ [this.prop]: this.fieldValue }, { firstFields: true }, (errors) => {
        this.validateState = errors ? 'error' : 'success';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage);
      });
    },
    formBlurHandler() {
      this.validate('blur');
    },
    formChangeHandler() {
      this.validate('change');
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('Form', 'add-form-item', [this]);

      Object.defineProperty(this, 'initialValue', {
        value: this.fieldValue,
      });

      this.applyRule();
    }
  },
  beforeDestroy() {
    this.dispatch('Form', 'remove-form-item', [this]);
  },
};
</script>
