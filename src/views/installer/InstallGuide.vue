<template>
  <Layout full-page id="h-install-guide">
    <!-- InstallGuide Header -->
    <Header shadow id="h-install-guide__header">
      <Row>
        <Col span="12" offset="6">
          <InstallerHeader :current-step="currentStep" :current-status="currentStepStatus">
          </InstallerHeader>
        </Col>
      </Row>
    </Header>
    <!-- InstallGuide Main Body -->
    <Main id="h-install-guide__body" ref="installGuideMain">
      <Row>
        <Col span="12" offset="6">
          <InstallerBody>
          </InstallerBody>
        </Col>
      </Row>
    </Main>
    <!-- InstallGuide Footer -->
    <Footer v-if="false">
      <Row>
        <Col span="12" offset="6">
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
      this.currentStep = 1;
    });
    this.$on('blog-cancel', () => {
      this.currentStep = 0;
    });

    this.$on('user-complete', () => {
      this.currentStep = 2;
    });
    this.$on('user-cancel', () => {
      this.currentStep = 1;
    });

    this.$on('submitted', () => {
      this.currentStep = 3;
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
