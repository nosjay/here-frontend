<template>
  <section :class="blockClasses">
    <slot></slot>
  </section>
</template>

<script>
const layoutBlockClass = 'h-layout';

export default {
  name: 'Layout',
  props: {
    fullPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasAside: false,
    };
  },
  computed: {
    blockClasses() {
      return [
        layoutBlockClass,
        {
          [`${layoutBlockClass}--has-aside`]: this.hasAside,
          [`${layoutBlockClass}--full-page`]: this.fullPage,
        },
      ];
    },
  },
  methods: {
    findAside() {
      return this.$children.some(child => child.$options.name === 'Aside');
    },
  },
  mounted() {
    this.hasAside = this.findAside();
  },
};
</script>

<style lang="scss">
@import "../../../styles/components/layout";
</style>
