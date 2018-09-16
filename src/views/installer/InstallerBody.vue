<template>
  <div id="h-install-guide__body__form">

    <div id="h-install-guide-blog-section">
      <Divider title="Blog Information" />
      <Form id="h-install-guide__body__form__blog" :model="bloggerInfo" :disabled="submitStatus">
        <FormItem>
          <Input v-model="bloggerInfo.title" />
        </FormItem>

        <FormItem>
          <Input v-model="bloggerInfo.subTitle" />
        </FormItem>
      </Form>
    </div>

    <transition name="fade">
      <div id="h-install-guide-user-section" v-if="userInfoShow">
        <Divider title="User Information" />
        <Form id="h-install-guide__body__form__user" :model="userInfo" :disabled="submitStatus">
          <FormItem>
            <Input v-model="userInfo.email" />
          </FormItem>

          <FormItem>
            <Input v-model="userInfo.username" />
          </FormItem>

          <FormItem>
            <Input v-model="userInfo.password" />
          </FormItem>
        </Form>
      </div>
    </transition>

    <transition name="fade">
      <div id="h-install-guide-submit" v-if="submitBtnShow">
        <button @click="handleSubmit" :disabled="submitStatus">Submit</button>
      </div>
    </transition>
  </div>
</template>

<script>
import Emitter from '../../utils/emitter';


export default {
  name: 'InstallerBody',
  mixins: [Emitter],
  computed: {
    userInfoShow() {
      return !!(this.bloggerInfo.title && this.bloggerInfo.subTitle);
    },
    submitBtnShow() {
      return !!(this.userInfo.email && this.userInfo.username && this.userInfo.password);
    },
  },
  data() {
    return {
      bloggerInfo: {
        title: '',
        subTitle: '',
      },
      userInfo: {
        email: '',
        username: '',
        password: '',
      },
      submitStatus: false,
    };
  },
  methods: {
    handleSubmit() {
      this.submitStatus = true;
    },
  },
  watch: {
    userInfoShow(value) {
      this.dispatch('InstallGuide', `blog-${value ? 'complete' : 'cancel'}`);
    },
    submitBtnShow(value) {
      this.dispatch('InstallGuide', `user-${value ? 'complete' : 'cancel'}`);
    },
    submitStatus(value) {
      if (value) {
        this.dispatch('InstallGuide', 'submitted');
      }
    },
  },
};
</script>

<style scoped>

#h-install-guide__body__form {
  padding: 1rem 2.5rem;
}

#h-install-guide-user-section {
  margin-top: 3.5rem;
}

</style>
