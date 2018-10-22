<template>
  <Layout full-page id="h-install-guide" v-selection.disabled="" v-context-menu.disabled="">

    <!-- InstallGuide Header -->
    <Header shadow id="h-install-guide__header">
      <Row>
        <Col :sm="{span: 24}" :md="{ span: 16, offset: 4 }" :lg="{ span: 12, offset: 6 }">
          <InstallerHeader :current-step="currentStep" :current-status="currentStepStatus">
          </InstallerHeader>
        </Col>
      </Row>
    </Header>

    <!-- InstallGuide Main Body -->
    <Main id="h-install-guide__body" ref="installGuideMain">
      <Row>
        <Col :sm="{span: 24}" :md="{ span: 16, offset: 4 }" :lg="{ span: 12, offset: 6 }">
          <InstallerBody></InstallerBody>
        </Col>
      </Row>
    </Main>

    <!-- InstallGuide Footer -->
    <Footer v-if="false">
      <Row>
        <Col :sm="{span: 24}" :md="{ span: 16, offset: 4 }" :lg="{ span: 12, offset: 6 }">
          <InstallerFooter></InstallerFooter>
        </Col>
      </Row>
    </Footer>

  </Layout>
</template>

<script>
import InstallerHeader from './InstallerHeader.vue';
import InstallerFooter from './InstallerFooter.vue';
import InstallerBody from './InstallerBody.vue';

const STATE_BLOG_EDIT = 0;
const STATE_USER_EDIT = 1;
const STATE_SUBMIT_SHOW = 2;
const STATE_SUBMIT_CLICKED = 3;


export default {
  name: 'InstallGuide',
  data() {
    return {
      currentStep: 0,
      currentStepStatus: 'process',
    };
  },
  methods: {
  },
  mounted() {
    this.$on('blog-complete', () => {
      this.currentStep = STATE_USER_EDIT;
    });
    this.$on('blog-cancel', () => {
      this.currentStep = STATE_BLOG_EDIT;
    });

    this.$on('user-complete', () => {
      this.currentStep = STATE_SUBMIT_SHOW;
    });
    this.$on('user-cancel', () => {
      this.currentStep = STATE_USER_EDIT;
    });

    this.$on('submitted', () => {
      this.currentStep = STATE_SUBMIT_CLICKED;
    });
  },
  components: { InstallerHeader, InstallerFooter, InstallerBody },
};
</script>

<style lang="scss" scoped>

#h-install-guide {

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

}

</style>
