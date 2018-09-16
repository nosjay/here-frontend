<template>
  <div :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
const formItemBlockClass = 'h-form__item';

export default {
  name: 'FormItem',
  props: {
  },
  computed: {
    blockClasses() {
      return [formItemBlockClass];
    },
  },
};
</script>

<style scoped>

</style>
