<template>
  <Layout full-page>
    <Header>
      header
    </Header>
    <Main>
      <router-view/>
    </Main>
    <Footer center>
      footer
    </Footer>
  </Layout>
</template>

<script>
export default {
  name: 'InstallerLayout',
};
</script>

<style scoped>

</style>
