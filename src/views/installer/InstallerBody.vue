<template>
  <div id="h-install-guide__body__form">

    <div id="h-install-guide-blog-section">
      <Divider title="Blog Information" />
      <Form id="h-install-guide__body__form__blog" :model="bloggerInfo" :disabled="submitStatus">
        <FormItem label="Blog Title" label-for="blog__form__title">
          <Input control-id="blog__form__title" v-model="bloggerInfo.title" />
        </FormItem>

        <FormItem label="Blog SubTitle" label-for="blog__form__sub-title">
          <Input control-id="blog__form__sub-title" v-model="bloggerInfo.subTitle" />
        </FormItem>
      </Form>
    </div>

    <transition name="fade">
      <div id="h-install-guide-user-section" v-show="userInfoShow">
        <Divider title="User Information" />
        <Form id="h-install-guide__body__form__user" :model="userInfo" :disabled="submitStatus">
          <FormItem label="E-Mail" label-for="user__form__email">
            <Input control-id="user__form__email" v-model="userInfo.email" />
          </FormItem>

          <FormItem label="Username" label-for="user__form__username">
            <Input control-id="user__form__username" v-model="userInfo.username" />
          </FormItem>

          <FormItem label="Password" label-for="user__form__password">
            <Input control-id="user__form__password" v-model="userInfo.password" type="password" />
          </FormItem>
        </Form>
      </div>
    </transition>

    <transition name="fade">
      <div id="h-install-guide-submit" v-show="submitBtnShow && userInfoShow">
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

#h-install-guide__body__form__blog,
#h-install-guide__body__form__user {
  margin-left: 1.5rem;
}

#h-install-guide-user-section {
  margin-top: 3.5rem;
}

</style>
