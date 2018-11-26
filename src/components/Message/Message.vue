<template>
  <div :class="blockClasses">
    <Notice v-for="notice in notices"
      :key="notice.name"
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
  computed: {
    blockClasses() {
      return [`${messageBlockClass}`];
    },
  },
  data() {
    return {
      messageBlockClass,
      notices: [],
    };
  },
  methods: {
    addNotice(noticeProps) {
      console.log({ addNotice: noticeProps });
    },
    closeNotice(noticeName) {
      console.log({ closeNotice: noticeName });
    },
    destroyAllNotice() {
      console.log({ destroyAllNotice: this.notices });
    },
  },
  components: { Notice },
};
</script>

<style scoped>

</style>
