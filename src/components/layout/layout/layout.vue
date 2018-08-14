<template>
  <section :class="blockClasses">
    <slot></slot>
  </section>
</template>

<script>
const layoutBlockClass = 'h-layout';

export default {
  name: 'Layout',
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
