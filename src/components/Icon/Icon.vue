<template>
  <i :class="blockClasses"></i>
</template>

<script>
const iconBlockClass = 'h-icon';


export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    blockClasses() {
      return [
        iconBlockClass,
        `${iconBlockClass}__${this.type}`,
      ];
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/icon';
</style>
