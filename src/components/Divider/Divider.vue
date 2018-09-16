<template>
  <div :class="blockClasses">
    <span v-if="title" :class="innerClasses">{{ title }}</span>
  </div>
</template>

<script>
import { has } from '../../utils/assist';

const dividerBlockClass = 'h-divider';

export default {
  name: 'Divider',
  props: {
    type: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return has(value, ['horizontal', 'vertical']);
      },
    },
    title: {
      type: String,
    },
    dashed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    blockClasses() {
      return [
        dividerBlockClass,
        `${dividerBlockClass}--${this.type}`,
        {
          [`${dividerBlockClass}--dashed`]: this.dashed,
        },
      ];
    },
    innerClasses() {
      return [
        `${dividerBlockClass}__title`,
      ];
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/divider';
</style>
