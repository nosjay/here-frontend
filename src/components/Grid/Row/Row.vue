<template>
  <div :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
import { has } from '../../../utils/assist';

const RowBlockClass = 'h-grid__row';


export default {
  name: 'Row',
  props: {
    align: {
      validator(value) {
        return has(value, ['top', 'middle', 'bottom']);
      },
    },
    justify: {
      validator(value) {
        return has(value, ['start', 'end', 'center', 'space-around', 'space-between']);
      },
    },
  },
  computed: {
    blockClasses() {
      return [
        RowBlockClass,
        {
          [`${RowBlockClass}--align--${this.align}`]: !!this.align,
          [`${RowBlockClass}--justify--${this.justify}`]: !!this.justify,
        },
      ];
    },
  },
};
</script>
