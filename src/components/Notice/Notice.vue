<template>
  <transition name="fade" @enter="enterHandler" @leave="leaveHandler">
    <div :class="blockClasses">
      <div :class="innerClasses" v-html="content"></div>
    </div>
  </transition>
</template>

<script>
const noticeBlockClass = 'h-notice';


export default {
  name: 'Notice',
  props: {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    onClose: {
      type: Function,
    },
    blockClassPrefix: {
      type: String,
      default: noticeBlockClass,
    },
  },
  computed: {
    blockClasses() {
      return [`${this.blockClassPrefix}__notice`];
    },
    innerClasses() {
      return [`${noticeBlockClass}__notice__content`];
    },
  },
  data() {
    return {
      messageTimer: null,
    };
  },
  methods: {
    clearMessageTimer() {
      if (this.messageTimer) {
        clearTimeout(this.messageTimer);
        this.messageTimer = null;
      }
    },
    close() {
      this.clearMessageTimer();
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
      this.$parent.closeNotice(this.name);
    },
    enterHandler() {
    },
    leaveHandler() {
    },
  },
  mounted() {
    this.clearMessageTimer();
    if (this.duration !== 0) {
      setTimeout(() => {
        this.close();
      }, Math.abs(this.duration) * 1000);
    }
  },
  beforeDestroy() {
    this.close();
  },
};
</script>

<style scoped>

</style>
