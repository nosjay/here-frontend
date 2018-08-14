<template>
  <div id="h-app">
    <Layout>
      <Aside style="min-width: 25%;min-height: 100vh;background: #f1f1f1f1;">
        aside
      </Aside>

      <Layout>
        <Header>
          header
        </Header>
        <Main>
          <router-view/>
        </Main>
        <Footer>
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
