<template>
  <div :class="blockClasses" :style="blockStyles">
    <div :class="`${blockClassPrefix}__tail`">
      <i></i>
    </div>
    <div :class="`${blockClassPrefix}__head`" :style="textStyles">
      <div :class="`${blockClassPrefix}__head__inner`">
        <span>{{stepIndex + 1}}</span>
      </div>
    </div>
    <div :class="`${blockClassPrefix}__body`">
      <div :class="`${blockClassPrefix}__body__title`" :style="textStyles">
        {{title}}
      </div>
      <slot>
        <div v-if="desc" :class="`${blockClassPrefix}__body__desc`">{{desc}}</div>
      </slot>
    </div>
  </div>
</template>

<script>
const stepBlockClass = 'h-steps__step';


export default {
  name: 'Step',
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
    },
    bgColor: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      stepIndex: null,
      stepTotal: null,
      currentStatus: null,
    };
  },
  computed: {
    blockClasses() {
      return [
        stepBlockClass,
        `${stepBlockClass}--${this.currentStatus}`,
      ];
    },
    blockClassPrefix() {
      return stepBlockClass;
    },
    blockStyles() {
      return {
        width: `${(1 / this.stepTotal) * 100}%`,
      };
    },
    textStyles() {
      const styles = {};
      if (this.bgColor) {
        styles.backgroundColor = this.bgColor;
      }

      return styles;
    },
  },
};
</script>

<style scoped>

</style>
