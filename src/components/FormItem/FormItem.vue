<template>
  <div :class="blockClasses">
    <label
      :class="`${formItemBlockClass}__label`" :style="labelStyles" :for="labelFor"
      v-if="labelShow"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <div :class="`${formItemBlockClass}__body`">
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
const formItemBlockClass = 'h-form__item';


export default {
  name: 'FormItem',
  props: {
    labelFor: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  computed: {
    blockClasses() {
      return [formItemBlockClass];
    },
    labelStyles() {
      return {};
    },
    labelShow() {
      return !!(this.label || this.$slots.label);
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
};
</script>

<style scoped>

</style>
