<template>
  <transition name="fade">
    <div :class="blockClasses" :style="blockStyles" v-show="show">
      <div :class="innerClasses" :style="innerStyles"></div>
    </div>
  </transition>
</template>

<script>
const loadingBarBlockClass = 'h-LoadingBar';

export default {
  name: 'LoadingBar',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    failedColor: {
      type: String,
      default: 'error',
    },
    height: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      percent: 0,
      status: 'success',
      show: false,
    };
  },
  computed: {
    blockClasses() {
      return [loadingBarBlockClass];
    },
    blockStyles() {
      return {
        height: `${this.height}px`,
      };
    },
    innerClasses() {
      return [
        `${loadingBarBlockClass}__inner`,
        {
          [`${loadingBarBlockClass}__inner--primary`]: this.color === 'primary' && this.status === 'success',
          [`${loadingBarBlockClass}__inner--failed`]: this.failedColor === 'error' && this.status === 'error',
        },
      ];
    },
    innerStyles() {
      const style = {
        width: `${this.percent}%`,
        height: `${this.height}px`,
      };

      // success color custom
      if (this.color !== 'primary' && this.status === 'success') {
        style.backgroundColor = this.color;
      }

      // failed color custom
      if (this.failedColor !== 'error' && this.status === 'error') {
        style.backgroundColor = this.failedColor;
      }

      return style;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/components/loading-bar";
</style>
