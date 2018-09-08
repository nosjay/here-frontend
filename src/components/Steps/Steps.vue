<template>
  <div :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
import { has } from '../../utils/assist';

const stepsBlockClass = 'h-steps';

export default {
  name: 'Steps',
  props: {
    current: {
      type: Number,
      default: 0,
    },
    status: {
      validator(value) {
        return has(value, ['wait', 'process', 'finish', 'error']);
      },
      default: 'process',
    },
    direction: {
      validator(value) {
        return has(value, ['horizontal', 'vertical']);
      },
      default: 'horizontal',
    }
  },
  computed: {
    blockClasses() {
      return [
        stepsBlockClass,
        `${stepsBlockClass}--${this.direction}`,
      ];
    },
  },
  methods: {
    updateChildrenProps() {
      // eslint-disable-next-line no-unused-vars
      const childrenCount = this.$children.length;

      this.$children.forEach((child, index) => {
        child.stepIndex = index;
        child.stepTotal = childrenCount;

        // update steps status
        if (index === this.current) {
          child.currentStatus = 'process';
        } else if (index < this.current) {
          child.currentStatus = 'finish';
        } else {
          child.currentStatus = 'wait';
        }
      });
    },
  },
  mounted() {
    this.updateChildrenProps();
  },
  watch: {
    current() {
      this.updateChildrenProps();
    },
  },
};
</script>
