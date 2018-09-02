<template>
  <Layout full-page>
    <!-- InstallGuide Header -->
    <Header shadow>
      <Row>
        <Col span="12" offset="6">
          <InstallerHeader></InstallerHeader>
        </Col>
      </Row>
    </Header>
    <!-- InstallGuide Main Body -->
    <Main>
      <Row>
        <Col span="16" offset="4">
          <InstallerBody></InstallerBody>
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
  components: { InstallerHeader, InstallerFooter, InstallerBody },
};
</script>

<style scoped>

</style>
