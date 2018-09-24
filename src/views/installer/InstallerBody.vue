<template>
  <div id="h-install-guide__body__form">

    <div class="h-install-guide-section">
      <Divider title="Blog Information" />
      <Form :model="bloggerInfo" :disabled="submitStatus">
        <FormItem label="Blog Title" label-for="blog__form__title" label-width="100px">
          <Input
            control-id="blog__form__title"
            v-model="bloggerInfo.title"
            placeholder="Please enter the title of your blog"/>
        </FormItem>

        <FormItem label="Description" label-for="blog__form__description" label-width="100px">
          <Input
            control-id="blog__form__description"
            v-model="bloggerInfo.description"
            placeholder="Please enter the description of your blog"/>
        </FormItem>
      </Form>
    </div>

    <transition name="fade">
      <div class="h-install-guide-section" v-show="userInfoShow">
        <Divider title="User Information" />
        <Form :model="userInfo" :disabled="submitStatus">
          <FormItem label="Mail" label-for="user__form__email" label-width="100px">
            <Input
              control-id="user__form__email"
              v-model="userInfo.email"
              placeholder="Please enter the blogger's email address"
            />
          </FormItem>

          <FormItem label="Username" label-for="user__form__username" label-width="100px">
            <Input
              control-id="user__form__username"
              v-model="userInfo.username"
              placeholder="Please enter the user name that the blogger uses to login"
            />
          </FormItem>

          <FormItem label="Password" label-for="user__form__password" label-width="100px">
            <Input
              control-id="user__form__password"
              v-model="userInfo.password"
              type="password"
              placeholder="Please enter the blogger's password for login"
            />
          </FormItem>
        </Form>
      </div>
    </transition>

    <transition name="fade">
      <div class="h-install-guide-section" v-show="submitBtnShow && userInfoShow">
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
      return !!(this.bloggerInfo.title && this.bloggerInfo.description);
    },
    submitBtnShow() {
      return !!(this.userInfo.email && this.userInfo.username && this.userInfo.password);
    },
  },
  data() {
    return {
      bloggerInfo: {
        title: '',
        description: '',
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

<style scoped lang="scss">

#h-install-guide__body__form {
  padding: 1rem 2.5rem;
}

form {
  padding: 0 1rem;
}

.h-install-guide-section {
  margin-bottom: 5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

</style>
