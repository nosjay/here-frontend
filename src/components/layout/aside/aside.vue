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
    'full-page': {
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
        },
      ];
    },
    blockStyles() {
      let minHeight = 'auto';
      if (this.fullPage) {
        minHeight = '100vh';
      }

      return {
        width: this.width,
        minWidth: this.width,
        minHeight,
      };
    },
    innerClasses() {
      return [`${asideBlockClass}__inner`];
    },
  },
};
</script>
