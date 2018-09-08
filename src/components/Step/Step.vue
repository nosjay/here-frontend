<template>
  <div :class="blockClasses" :style="blockStyles">
    <div :class="`${blockClassPrefix}__tail`">
      <i></i>
    </div>
    <div :class="`${blockClassPrefix}__head`" :style="{backgroundColor: bgColor}">
      <div :class="`${blockClassPrefix}__head__inner`">
        <span>{{stepIndex + 1}}</span>
      </div>
    </div>
    <div :class="`${blockClassPrefix}__body`">
      <div :class="`${blockClassPrefix}__body__title`" :style="{backgroundColor: bgColor}">
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
  },
};
</script>

<style scoped>

</style>
