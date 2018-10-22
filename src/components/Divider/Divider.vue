<template>
  <div :class="wrapperClasses">

    <!-- block -->
    <div :class="blockClasses">
      <span v-if="title" :class="innerClasses">{{ title }}</span>
    </div>

    <!-- body -->
    <div :class="bodyClasses" v-if="$slots.default">
      <slot></slot>
    </div>

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
    wrapperClasses() {
      return [
        `${dividerBlockClass}__wrapper`,
      ];
    },
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
    bodyClasses() {
      return [
        `${dividerBlockClass}__body`,
      ];
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/components/divider';
</style>
