<template>
  <aside :class="blockClasses" :style="blockStyles">
    <section :class="innerClasses">
      <slot></slot>
    </section>
  </aside>
</template>

<script>
const asideBlockClass = 'h-layout__aside';


export default {
  name: 'Aside',
  props: {
    fullPage: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 'auto',
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    blockClasses() {
      return [
        asideBlockClass,
        {
          [`${asideBlockClass}--shadow`]: this.shadow,
          [`${asideBlockClass}--full-page`]: this.fullPage,
        },
      ];
    },
    blockStyles() {
      return {
        width: this.width,
        minWidth: this.width,
      };
    },
    innerClasses() {
      return [`${asideBlockClass}__inner`];
    },
  },
};
</script>
