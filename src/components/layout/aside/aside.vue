<template>
  <aside :class="blockClasses">
    <section :class="innerClasses">
      <slot></slot>
    </section>
  </aside>
</template>

<script>
const asideBlockClass = 'h-layout__aside';


export default {
  name: 'Aside',
  computed: {
    blockClasses() {
      return [asideBlockClass];
    },
    innerClasses() {
      return [`${asideBlockClass}__inner`];
    },
  },
};
</script>

<style scoped>

</style>
