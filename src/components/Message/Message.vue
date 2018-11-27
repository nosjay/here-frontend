<template>
  <div :class="blockClasses" :style="blockStyles">
    <Notice v-for="notice in notices"
      :key="notice.name"
      :name="notice.name"
      :content="notice.content"
      :duration="notice.duration"
      :onClose="notice.onClose"
      :blockClassPrefix="messageBlockClass"
    ></Notice>
  </div>
</template>

<script>
import Notice from '../Notice';


const messageBlockClass = 'h-message';

export default {
  name: 'Message',
  props: {
    top: {
      type: String,
      default: '45px',
    },
  },
  computed: {
    blockClasses() {
      return [`${messageBlockClass}`];
    },
    blockStyles() {
      return {
        top: this.top,
      };
    },
  },
  data() {
    return {
      messageBlockClass,
      noticeIndex: 0,
      notices: [],
    };
  },
  methods: {
    addNotice(noticeProps) {
      const prop = Object.assign({
        name: this.getUniqueId(),
      }, noticeProps);
      this.notices.push(prop);
    },
    closeNotice(noticeName) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.notices.length; ++i) {
        if (this.notices[i].name === noticeName) {
          this.notices.splice(i, 1);
          break;
        }
      }
    },
    destroyAllNotice() {
      this.notices = [];
    },
    getUniqueId() {
      // eslint-disable-next-line no-plusplus
      return `h_message_${(new Date()).getTime()}_${this.noticeIndex++}`;
    },
  },
  mounted() {
    this.noticeIndex = parseInt(Math.random() * (new Date()).getTime(), 10);
  },
  components: { Notice },
};
</script>

<style lang="scss">
@import '../../styles/components/message';
</style>
