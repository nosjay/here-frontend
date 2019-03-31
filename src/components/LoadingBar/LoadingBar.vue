<template>
  <transition name="fade">
    <div :class="blockClasses" :style="blockStyles" v-show="show">
      <div :class="innerClasses" :style="innerStyles"></div>
    </div>
  </transition>
</template>

<script>
import {
  LOADING_BAR_PRIMARY_COLOR,
  LOADING_BAR_ERROR_COLOR,
  LOADING_BAR_SUCCESS_STATUS,
  LOADING_BAR_FAILURE_STATUS,
} from './LoadingBarTypes';


const loadingBarBlockClass = 'h-loading-bar';

export default {
  name: 'LoadingBar',
  props: {
    primaryColor: {
      type: String,
      default: LOADING_BAR_PRIMARY_COLOR,
    },
    failureColor: {
      type: String,
      default: LOADING_BAR_ERROR_COLOR,
    },
    height: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      percent: 0,
      status: LOADING_BAR_SUCCESS_STATUS,
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
          [`${loadingBarBlockClass}__inner--primary`]: this.isPrimaryColor && this.isSuccess,
          [`${loadingBarBlockClass}__inner--failure`]: this.isErrorColor && this.isFailure,
        },
      ];
    },
    innerStyles() {
      const style = {
        width: `${this.percent}%`,
        height: `${this.height}px`,
      };

      // color custom
      if (!this.isPrimaryColor && this.isSuccess) {
        style.backgroundColor = this.primaryColor;
      }
      if (!this.isErrorColor && this.isFailure) {
        style.backgroundColor = this.failureColor;
      }

      return style;
    },
    isPrimaryColor() {
      return this.primaryColor === LOADING_BAR_PRIMARY_COLOR;
    },
    isErrorColor() {
      return this.failureColor === LOADING_BAR_ERROR_COLOR;
    },
    isSuccess() {
      return this.status === LOADING_BAR_SUCCESS_STATUS;
    },
    isFailure() {
      return this.status === LOADING_BAR_FAILURE_STATUS;
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/components/loading-bar";
</style>
