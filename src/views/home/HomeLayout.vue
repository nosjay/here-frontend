<template>
  <Layout>
    <!-- left aside on page -->
    <Aside width="25%" full-page shadow><HomeAside></HomeAside></Aside>

    <!-- right container -->
    <Layout>
      <Header><HomeHeader></HomeHeader></Header>
      <Main><router-view/></Main>
      <Footer center><HomeFooter></HomeFooter></Footer>
    </Layout>
  </Layout>
</template>

<script>
import HomeAside from './HomeAside.vue';
import HomeHeader from './HomeHeader.vue';
import HomeFooter from './HomeFooter.vue';


export default {
  name: 'HomeLayout',
  components: { HomeAside, HomeHeader, HomeFooter },
};
</script>

<style scoped>

</style>
