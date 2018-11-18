<template>
  <div id="h-install-guide__body__form">

    <!-- Register Form -->
    <Form :model="registerForm" :disabled="submitStatus" label-width="100px" :rules="rules"
          ref="form">

      <!-- Blog Information -->
      <Divider title="Blog Information" class="h-install-guide-section">
        <!-- Blog Title -->
        <FormItem label="Blog Title" label-for="form__title" prop="title">
          <Input
            control-id="form__title"
            v-model="registerForm.title"
            placeholder="Please enter the title of your blog"
          />
        </FormItem>

        <!-- Blog Description -->
        <FormItem label="Description" label-for="form__description" prop="description">
          <Input
            control-id="form__description"
            v-model="registerForm.description"
            placeholder="Please enter the description of your blog"
          />
        </FormItem>
      </Divider> <!-- Blog Information End -->

      <transition name="fade">
        <!-- User Information -->
        <Divider title="User Information" class="h-install-guide-section" v-show="userInfoShow">
          <!-- User E-Mail -->
          <FormItem label="E-Mail" label-for="form__email" prop="email">
            <Input
              control-id="form__email"
              v-model="registerForm.email"
              placeholder="Please enter the blogger's email address"
            />
          </FormItem>

          <!-- User Nickname -->
          <FormItem label="Username" label-for="form__username" prop="username">
            <Input
              control-id="form__username"
              v-model="registerForm.username"
              placeholder="Please enter the user name that the blogger uses to login"
            />
          </FormItem>

          <!-- User Password -->
          <FormItem label="Password" label-for="form__password" prop="password">
            <Input
              control-id="form__password"
              v-model="registerForm.password"
              type="password"
              placeholder="Please enter the blogger's password for login"
            />
          </FormItem>
        </Divider> <!-- User Information End -->
      </transition>

      <!-- Submit Button -->
      <transition name="fade">
        <div class="h-install-guide-section" v-show="submitBtnShow && userInfoShow">
          <Button :loading="submitStatus" :disabled="submitStatus" type="primary"
                  @click.prevent.stop="submitHandler"
          >
            <span v-if="submitStatus">Loading</span>
            <span v-else>Done</span>
          </Button>
        </div>
      </transition>

    </Form> <!-- Register Form End -->

  </div>
</template>

<script>
import Emitter from '../../utils/emitter';


export default {
  name: 'InstallerBody',
  mixins: [Emitter],
  computed: {
    userInfoShow() {
      return !!(this.registerForm.title && this.registerForm.description);
    },
    submitBtnShow() {
      return !!(this.registerForm.email && this.registerForm.username
        && this.registerForm.password);
    },
  },
  data() {
    return {
      registerForm: {
        title: '',
        description: '',
        email: '',
        username: '',
        password: '',
      },
      rules: {
        title: [
          { required: true, message: 'The title of your blog cannot be empty', trigger: 'blur' },
        ],
        description: [
          { required: true, message: 'The description of your blog cannot be empty', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'No e-mail how to accept flattery:)', trigger: 'blur' },
          { type: 'email', message: 'Deceiving yourself?' },
        ],
        username: [
          { required: true, message: 'Blog cannot be published by anonymous!', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'What do you think of it?', trigger: 'blur' },
          { type: 'string', min: 6, message: 'Hmm, I can break this site' },
          { type: 'string', pattern: /(\w+\d+\W+)|(\d+\w+\W+)|(\W+\w+\d+)/, message: 'Come on╮(╯▽╰)╭' },
        ],
      },
      submitStatus: false,
    };
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitStatus = true;
          this.$Provider.blogger(this.registerForm).then(res => res.config(null, true))
            .then((getter) => {
              console.log(getter);
            }, (error) => {
              console.log((error));
            });
        }
      });
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
