<template>
  <form :class="blockClasses">
    <slot></slot>
  </form>
</template>

<script>
const formBlockClass = 'h-form';

export default {
  name: 'Form',
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    labelWidth: {
      type: Number,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    blockClasses() {
      return [formBlockClass];
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  provide() {
    return { form: this };
  },
  methods: {
    validate(callback) {
      console.log(callback);
    },
  },
  watch: {
    rules() {
      this.validate(() => {});
    },
  },
};
</script>

<style scoped>

</style>
