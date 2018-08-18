<template>
  <div id="h-app">
    <Layout>
      <Aside width="25%" full-page>
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
  </div>
</template>

<script>
export default {
  mounted() {
  },
};
</script>

<style lang="scss">
</style>
