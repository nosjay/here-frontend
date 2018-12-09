<template>
  <Layout>
    <Header>
      <Row>
        <Col span="16" offset="4">
          <HomeHeader></HomeHeader>
        </Col>
      </Row>
    </Header>
    <Main>
      <Row>
        <Col span="14" offset="5">
          <router-view/>
        </Col>
      </Row>
    </Main>
    <Footer><HomeFooter></HomeFooter></Footer>
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
