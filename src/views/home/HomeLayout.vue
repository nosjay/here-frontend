<template>
  <Layout>
    <Aside width="25%" full-page shadow>
      aside
    </Aside>

    <Layout>
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
  </Layout>
</template>

<script>
export default {
  name: 'HomeLayout',
};
</script>

<style scoped>

</style>
